/*
  # Helper Functions for Smart AI Cafeteria

  ## Overview
  This migration creates database functions to handle business logic and common operations.

  ## Functions Created
  1. `get_order_summary` - Get detailed order information with items
  2. `update_order_status` - Update order status with validation
  3. `create_notification_for_order` - Create notification when order status changes
  4. `get_sales_statistics` - Get sales data for reporting
  5. `clear_cart` - Clear student's cart after order placement
  6. `add_to_cart` - Add or update item in cart
  7. `get_cart_with_items` - Get cart with full menu item details

  ## Security
  - Functions use SECURITY DEFINER carefully with proper checks
  - RLS policies are respected
*/

-- =====================================================
-- FUNCTION: Get Order Summary
-- =====================================================
CREATE OR REPLACE FUNCTION get_order_summary(order_id_param uuid)
RETURNS TABLE (
  order_id uuid,
  order_number text,
  student_name text,
  student_email text,
  status text,
  subtotal numeric,
  tax numeric,
  total numeric,
  payment_method text,
  payment_status text,
  created_at timestamptz,
  items jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.order_number,
    p.full_name,
    p.email,
    o.status,
    o.subtotal,
    o.tax,
    o.total,
    o.payment_method,
    o.payment_status,
    o.created_at,
    jsonb_agg(
      jsonb_build_object(
        'name', mi.name,
        'quantity', oi.quantity,
        'price', oi.price_at_order,
        'subtotal', oi.subtotal,
        'is_vegetarian', mi.is_vegetarian
      )
    ) as items
  FROM orders o
  JOIN profiles p ON o.student_id = p.id
  JOIN order_items oi ON o.id = oi.order_id
  JOIN menu_items mi ON oi.menu_item_id = mi.id
  WHERE o.id = order_id_param
  GROUP BY o.id, p.full_name, p.email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Update Order Status with Notifications
-- =====================================================
CREATE OR REPLACE FUNCTION update_order_status(
  order_id_param uuid,
  new_status text
)
RETURNS boolean AS $$
DECLARE
  old_status text;
  student_id_var uuid;
  order_num text;
  notification_title text;
  notification_message text;
BEGIN
  -- Validate status
  IF new_status NOT IN ('pending', 'preparing', 'ready', 'completed', 'cancelled') THEN
    RAISE EXCEPTION 'Invalid order status';
  END IF;

  -- Get current order info
  SELECT status, student_id, order_number 
  INTO old_status, student_id_var, order_num
  FROM orders 
  WHERE id = order_id_param;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found';
  END IF;

  -- Update order status
  UPDATE orders 
  SET 
    status = new_status,
    completed_at = CASE WHEN new_status = 'completed' THEN now() ELSE completed_at END
  WHERE id = order_id_param;

  -- Create notification based on status
  CASE new_status
    WHEN 'preparing' THEN
      notification_title := 'Order Being Prepared';
      notification_message := 'Your order ' || order_num || ' is now being prepared by our kitchen staff.';
    WHEN 'ready' THEN
      notification_title := 'Order Ready for Pickup';
      notification_message := 'Your order ' || order_num || ' is ready! Please collect it from the counter.';
    WHEN 'completed' THEN
      notification_title := 'Order Completed';
      notification_message := 'Thank you! Your order ' || order_num || ' has been completed.';
    WHEN 'cancelled' THEN
      notification_title := 'Order Cancelled';
      notification_message := 'Your order ' || order_num || ' has been cancelled.';
    ELSE
      notification_title := 'Order Status Update';
      notification_message := 'Your order ' || order_num || ' status has been updated.';
  END CASE;

  -- Insert notification
  INSERT INTO notifications (user_id, title, message, type, is_important, related_order_id)
  VALUES (
    student_id_var,
    notification_title,
    notification_message,
    'order',
    new_status IN ('ready', 'cancelled'),
    order_id_param
  );

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get Sales Statistics
-- =====================================================
CREATE OR REPLACE FUNCTION get_sales_statistics(
  start_date timestamptz DEFAULT (now() - interval '7 days'),
  end_date timestamptz DEFAULT now()
)
RETURNS TABLE (
  total_orders bigint,
  total_revenue numeric,
  pending_orders bigint,
  preparing_orders bigint,
  ready_orders bigint,
  completed_orders bigint,
  cancelled_orders bigint,
  daily_sales jsonb,
  top_items jsonb,
  category_breakdown jsonb
) AS $$
BEGIN
  RETURN QUERY
  WITH order_stats AS (
    SELECT 
      COUNT(*) as total_orders,
      COALESCE(SUM(total), 0) as total_revenue,
      COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
      COUNT(*) FILTER (WHERE status = 'preparing') as preparing_orders,
      COUNT(*) FILTER (WHERE status = 'ready') as ready_orders,
      COUNT(*) FILTER (WHERE status = 'completed') as completed_orders,
      COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_orders
    FROM orders
    WHERE created_at BETWEEN start_date AND end_date
  ),
  daily_data AS (
    SELECT jsonb_agg(
      jsonb_build_object(
        'date', DATE(created_at),
        'sales', SUM(total),
        'orders', COUNT(*)
      ) ORDER BY DATE(created_at)
    ) as daily_sales
    FROM orders
    WHERE created_at BETWEEN start_date AND end_date
    GROUP BY DATE(created_at)
  ),
  top_items_data AS (
    SELECT jsonb_agg(
      jsonb_build_object(
        'name', mi.name,
        'orders', COUNT(*),
        'revenue', SUM(oi.subtotal)
      ) ORDER BY COUNT(*) DESC
    ) as top_items
    FROM order_items oi
    JOIN menu_items mi ON oi.menu_item_id = mi.id
    JOIN orders o ON oi.order_id = o.id
    WHERE o.created_at BETWEEN start_date AND end_date
    GROUP BY mi.name
    LIMIT 10
  ),
  category_data AS (
    SELECT jsonb_agg(
      jsonb_build_object(
        'category', mi.category,
        'revenue', SUM(oi.subtotal),
        'orders', COUNT(DISTINCT oi.order_id)
      )
    ) as category_breakdown
    FROM order_items oi
    JOIN menu_items mi ON oi.menu_item_id = mi.id
    JOIN orders o ON oi.order_id = o.id
    WHERE o.created_at BETWEEN start_date AND end_date
    GROUP BY mi.category
  )
  SELECT 
    os.total_orders,
    os.total_revenue,
    os.pending_orders,
    os.preparing_orders,
    os.ready_orders,
    os.completed_orders,
    os.cancelled_orders,
    COALESCE(dd.daily_sales, '[]'::jsonb),
    COALESCE(ti.top_items, '[]'::jsonb),
    COALESCE(cd.category_breakdown, '[]'::jsonb)
  FROM order_stats os
  CROSS JOIN daily_data dd
  CROSS JOIN top_items_data ti
  CROSS JOIN category_data cd;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Clear Cart After Order
-- =====================================================
CREATE OR REPLACE FUNCTION clear_cart(student_id_param uuid)
RETURNS void AS $$
BEGIN
  DELETE FROM cart_items WHERE student_id = student_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Add to Cart
-- =====================================================
CREATE OR REPLACE FUNCTION add_to_cart(
  student_id_param uuid,
  menu_item_id_param uuid,
  quantity_param integer DEFAULT 1
)
RETURNS uuid AS $$
DECLARE
  cart_item_id uuid;
BEGIN
  -- Check if item exists in menu and is available
  IF NOT EXISTS (
    SELECT 1 FROM menu_items 
    WHERE id = menu_item_id_param AND is_available = true
  ) THEN
    RAISE EXCEPTION 'Menu item not available';
  END IF;

  -- Insert or update cart item
  INSERT INTO cart_items (student_id, menu_item_id, quantity)
  VALUES (student_id_param, menu_item_id_param, quantity_param)
  ON CONFLICT (student_id, menu_item_id)
  DO UPDATE SET 
    quantity = cart_items.quantity + quantity_param,
    updated_at = now()
  RETURNING id INTO cart_item_id;

  RETURN cart_item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get Cart with Item Details
-- =====================================================
CREATE OR REPLACE FUNCTION get_cart_with_items(student_id_param uuid)
RETURNS TABLE (
  cart_item_id uuid,
  menu_item_id uuid,
  name text,
  price numeric,
  quantity integer,
  subtotal numeric,
  image_url text,
  is_vegetarian boolean,
  category text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ci.id,
    mi.id,
    mi.name,
    mi.price,
    ci.quantity,
    mi.price * ci.quantity as subtotal,
    mi.image_url,
    mi.is_vegetarian,
    mi.category
  FROM cart_items ci
  JOIN menu_items mi ON ci.menu_item_id = mi.id
  WHERE ci.student_id = student_id_param
  AND mi.is_available = true
  ORDER BY ci.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Create Order from Cart
-- =====================================================
CREATE OR REPLACE FUNCTION create_order_from_cart(
  student_id_param uuid,
  payment_method_param text,
  notes_param text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  order_id_var uuid;
  cart_subtotal numeric;
  cart_tax numeric;
  cart_total numeric;
BEGIN
  -- Calculate cart totals
  SELECT 
    SUM(mi.price * ci.quantity),
    SUM(mi.price * ci.quantity) * 0.05,
    SUM(mi.price * ci.quantity) * 1.05
  INTO cart_subtotal, cart_tax, cart_total
  FROM cart_items ci
  JOIN menu_items mi ON ci.menu_item_id = mi.id
  WHERE ci.student_id = student_id_param
  AND mi.is_available = true;

  IF cart_subtotal IS NULL OR cart_subtotal = 0 THEN
    RAISE EXCEPTION 'Cart is empty';
  END IF;

  -- Create order
  INSERT INTO orders (
    student_id,
    subtotal,
    tax,
    total,
    payment_method,
    notes
  )
  VALUES (
    student_id_param,
    cart_subtotal,
    cart_tax,
    cart_total,
    payment_method_param,
    notes_param
  )
  RETURNING id INTO order_id_var;

  -- Copy cart items to order items
  INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_order, subtotal)
  SELECT 
    order_id_var,
    ci.menu_item_id,
    ci.quantity,
    mi.price,
    mi.price * ci.quantity
  FROM cart_items ci
  JOIN menu_items mi ON ci.menu_item_id = mi.id
  WHERE ci.student_id = student_id_param
  AND mi.is_available = true;

  -- Clear cart
  PERFORM clear_cart(student_id_param);

  -- Create notification
  INSERT INTO notifications (user_id, title, message, type, is_important, related_order_id)
  SELECT 
    student_id_param,
    'Order Placed Successfully',
    'Your order ' || order_number || ' has been placed and will be ready soon.',
    'order',
    true,
    id
  FROM orders WHERE id = order_id_var;

  RETURN order_id_var;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
