/*
  # Seed Sample Data for Smart AI Cafeteria

  ## Overview
  This migration seeds the database with sample menu items for testing and demonstration.

  ## Changes
  1. Insert sample menu items across different categories
  2. All items are marked as available for immediate use
  
  ## Sample Data
  - 8 menu items covering Main Course, Fast Food, Breakfast, and Dessert
  - Mix of vegetarian and non-vegetarian items
  - Realistic pricing in INR
*/

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, is_vegetarian, image_url, is_available) VALUES
  (
    'Chicken Biryani',
    'Aromatic basmati rice cooked with tender chicken, spices, and herbs',
    120,
    'Main Course',
    false,
    'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  ),
  (
    'Paneer Butter Masala',
    'Cottage cheese cubes in rich tomato-based creamy gravy',
    100,
    'Main Course',
    true,
    'https://images.unsplash.com/photo-1567337710282-00832b415979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  ),
  (
    'Veg Sandwich',
    'Fresh vegetables with cheese and mint chutney in grilled bread',
    60,
    'Breakfast',
    true,
    'https://images.unsplash.com/photo-1656082496396-40c7a68d6fa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  ),
  (
    'Pizza Margherita',
    'Classic Italian pizza with mozzarella cheese, tomatoes, and basil',
    150,
    'Fast Food',
    true,
    'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  ),
  (
    'Chicken Burger',
    'Juicy grilled chicken patty with lettuce, tomato, and special sauce',
    110,
    'Fast Food',
    false,
    'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  ),
  (
    'Pasta Alfredo',
    'Creamy fettuccine pasta with parmesan cheese and herbs',
    130,
    'Main Course',
    true,
    'https://images.unsplash.com/photo-1628079251261-624e723b7326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  ),
  (
    'Chocolate Cake',
    'Rich and moist chocolate cake with chocolate ganache',
    80,
    'Dessert',
    true,
    'https://images.unsplash.com/photo-1707569859750-b1a954a9de3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  ),
  (
    'Thali Special',
    'Complete Indian meal with dal, vegetables, roti, rice, and dessert',
    140,
    'Main Course',
    true,
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    true
  )
ON CONFLICT DO NOTHING;
