# Smart AI Cafeteria - API Reference

## **Quick Start**

```typescript
import { authApi, menuApi, cartApi, ordersApi, notificationsApi } from './lib/api';
```

---

## **Authentication API**

### **signupStudent(data: StudentSignupData)**
Creates a new student account.

**Parameters:**
```typescript
{
  email: string;
  password: string;
  fullName: string;
  studentId: string;
  department: string;
}
```

**Returns:** `Promise<AuthData>`

**Example:**
```typescript
const result = await authApi.signupStudent({
  email: 'student@university.edu',
  password: 'SecurePass123!',
  fullName: 'John Doe',
  studentId: 'STU-2025-001',
  department: 'Computer Science'
});
```

---

### **signupAdmin(data: AdminSignupData)**
Creates a new admin account.

**Parameters:**
```typescript
{
  email: string;
  password: string;
  fullName: string;
  staffId: string;
  cafeteriaName: string;
}
```

**Returns:** `Promise<AuthData>`

**Example:**
```typescript
const result = await authApi.signupAdmin({
  email: 'admin@university.edu',
  password: 'AdminPass123!',
  fullName: 'Admin User',
  staffId: 'STF-001',
  cafeteriaName: 'Main Cafeteria'
});
```

---

### **login(data: LoginData)**
Authenticates a user.

**Parameters:**
```typescript
{
  email: string;
  password: string;
}
```

**Returns:** `Promise<AuthData>`

**Example:**
```typescript
const { session, user } = await authApi.login({
  email: 'user@university.edu',
  password: 'password123'
});
```

---

### **logout()**
Signs out the current user.

**Returns:** `Promise<void>`

**Example:**
```typescript
await authApi.logout();
```

---

### **getCurrentUser()**
Gets the current authenticated user's profile.

**Returns:** `Promise<Profile | null>`

**Example:**
```typescript
const profile = await authApi.getCurrentUser();
if (profile) {
  console.log(`Welcome ${profile.full_name}`);
}
```

---

## **Menu API**

### **getAllItems()**
Retrieves all available menu items.

**Returns:** `Promise<MenuItem[]>`

**Example:**
```typescript
const items = await menuApi.getAllItems();
```

---

### **getItemById(id: string)**
Gets a specific menu item by ID.

**Parameters:**
- `id`: Menu item UUID

**Returns:** `Promise<MenuItem | null>`

**Example:**
```typescript
const item = await menuApi.getItemById('123e4567-e89b-12d3-a456-426614174000');
```

---

### **searchItems(query: string)**
Searches menu items by name.

**Parameters:**
- `query`: Search term

**Returns:** `Promise<MenuItem[]>`

**Example:**
```typescript
const results = await menuApi.searchItems('biryani');
```

---

### **filterByVegetarian(isVeg: boolean)**
Filters items by vegetarian status.

**Parameters:**
- `isVeg`: `true` for vegetarian, `false` for non-vegetarian

**Returns:** `Promise<MenuItem[]>`

**Example:**
```typescript
const vegItems = await menuApi.filterByVegetarian(true);
```

---

### **createItem(item: MenuItemInsert)** (Admin Only)
Creates a new menu item.

**Parameters:**
```typescript
{
  name: string;
  description?: string;
  price: number;
  category: string;
  is_vegetarian?: boolean;
  image_url?: string;
  is_available?: boolean;
}
```

**Returns:** `Promise<MenuItem>`

**Example:**
```typescript
const newItem = await menuApi.createItem({
  name: 'Masala Dosa',
  description: 'Crispy rice crepe with potato filling',
  price: 80,
  category: 'Breakfast',
  is_vegetarian: true,
  image_url: 'https://example.com/dosa.jpg'
});
```

---

### **updateItem(id: string, updates: MenuItemUpdate)** (Admin Only)
Updates an existing menu item.

**Parameters:**
- `id`: Menu item UUID
- `updates`: Partial menu item object

**Returns:** `Promise<MenuItem>`

**Example:**
```typescript
await menuApi.updateItem(itemId, {
  price: 90,
  is_available: true
});
```

---

### **deleteItem(id: string)** (Admin Only)
Deletes a menu item.

**Parameters:**
- `id`: Menu item UUID

**Returns:** `Promise<void>`

**Example:**
```typescript
await menuApi.deleteItem(itemId);
```

---

### **toggleAvailability(id: string, isAvailable: boolean)** (Admin Only)
Toggles item availability.

**Parameters:**
- `id`: Menu item UUID
- `isAvailable`: Availability status

**Returns:** `Promise<MenuItem>`

**Example:**
```typescript
await menuApi.toggleAvailability(itemId, false); // Mark as unavailable
```

---

## **Cart API**

### **getCart(studentId: string)**
Retrieves student's cart with full item details.

**Parameters:**
- `studentId`: Student profile UUID

**Returns:** `Promise<CartItemWithDetails[]>`

**Example:**
```typescript
const cart = await cartApi.getCart(studentId);
console.log(`Cart has ${cart.length} items`);
```

---

### **addToCart(studentId: string, menuItemId: string, quantity?: number)**
Adds an item to cart or updates quantity if exists.

**Parameters:**
- `studentId`: Student profile UUID
- `menuItemId`: Menu item UUID
- `quantity`: Quantity to add (default: 1)

**Returns:** `Promise<string>` (cart_item_id)

**Example:**
```typescript
await cartApi.addToCart(studentId, menuItemId, 2);
```

---

### **updateCartItemQuantity(cartItemId: string, quantity: number)**
Updates the quantity of a cart item.

**Parameters:**
- `cartItemId`: Cart item UUID
- `quantity`: New quantity

**Returns:** `Promise<CartItem>`

**Example:**
```typescript
await cartApi.updateCartItemQuantity(cartItemId, 5);
```

---

### **removeFromCart(cartItemId: string)**
Removes an item from the cart.

**Parameters:**
- `cartItemId`: Cart item UUID

**Returns:** `Promise<void>`

**Example:**
```typescript
await cartApi.removeFromCart(cartItemId);
```

---

### **clearCart(studentId: string)**
Clears all items from student's cart.

**Parameters:**
- `studentId`: Student profile UUID

**Returns:** `Promise<void>`

**Example:**
```typescript
await cartApi.clearCart(studentId);
```

---

### **getCartTotal(studentId: string)**
Calculates cart totals with tax.

**Parameters:**
- `studentId`: Student profile UUID

**Returns:** `Promise<{ subtotal: number, tax: number, total: number, itemCount: number }>`

**Example:**
```typescript
const { subtotal, tax, total } = await cartApi.getCartTotal(studentId);
console.log(`Total: ₹${total}`);
```

---

## **Orders API**

### **createOrder(studentId: string, paymentMethod: string, notes?: string)**
Creates an order from cart items.

**Parameters:**
- `studentId`: Student profile UUID
- `paymentMethod`: 'upi', 'card', or 'razorpay'
- `notes`: Optional order notes

**Returns:** `Promise<string>` (order_id)

**Example:**
```typescript
const orderId = await ordersApi.createOrder(
  studentId,
  'upi',
  'No onions please'
);
```

---

### **getStudentOrders(studentId: string)**
Gets all orders for a student.

**Parameters:**
- `studentId`: Student profile UUID

**Returns:** `Promise<Order[]>`

**Example:**
```typescript
const orders = await ordersApi.getStudentOrders(studentId);
```

---

### **getOrderById(orderId: string)**
Gets detailed order information.

**Parameters:**
- `orderId`: Order UUID

**Returns:** `Promise<OrderSummary | null>`

**Example:**
```typescript
const order = await ordersApi.getOrderById(orderId);
console.log(`Order ${order.order_number}: ${order.status}`);
```

---

### **getAllOrders()** (Admin Only)
Gets all orders in the system.

**Returns:** `Promise<Order[]>`

**Example:**
```typescript
const allOrders = await ordersApi.getAllOrders();
```

---

### **getOrdersByStatus(status: string)** (Admin Only)
Filters orders by status.

**Parameters:**
- `status`: 'pending', 'preparing', 'ready', 'completed', or 'cancelled'

**Returns:** `Promise<Order[]>`

**Example:**
```typescript
const pendingOrders = await ordersApi.getOrdersByStatus('pending');
```

---

### **updateOrderStatus(orderId: string, newStatus: string)** (Admin Only)
Updates order status and creates notification.

**Parameters:**
- `orderId`: Order UUID
- `newStatus`: New status value

**Returns:** `Promise<boolean>`

**Example:**
```typescript
await ordersApi.updateOrderStatus(orderId, 'preparing');
```

---

### **updatePaymentStatus(orderId: string, paymentStatus: string)**
Updates payment status.

**Parameters:**
- `orderId`: Order UUID
- `paymentStatus`: 'pending', 'completed', or 'failed'

**Returns:** `Promise<Order>`

**Example:**
```typescript
await ordersApi.updatePaymentStatus(orderId, 'completed');
```

---

### **getOrderStats()** (Admin Only)
Gets comprehensive sales statistics.

**Returns:** `Promise<SalesStatistics>`

**Example:**
```typescript
const stats = await ordersApi.getOrderStats();
console.log(`Total Revenue: ₹${stats.total_revenue}`);
console.log(`Pending Orders: ${stats.pending_orders}`);
```

---

## **Notifications API**

### **getUserNotifications(userId: string)**
Gets all notifications for a user.

**Parameters:**
- `userId`: User profile UUID

**Returns:** `Promise<Notification[]>`

**Example:**
```typescript
const notifications = await notificationsApi.getUserNotifications(userId);
```

---

### **getUnreadCount(userId: string)**
Gets count of unread notifications.

**Parameters:**
- `userId`: User profile UUID

**Returns:** `Promise<number>`

**Example:**
```typescript
const unreadCount = await notificationsApi.getUnreadCount(userId);
```

---

### **markAsRead(notificationId: string)**
Marks a notification as read.

**Parameters:**
- `notificationId`: Notification UUID

**Returns:** `Promise<Notification>`

**Example:**
```typescript
await notificationsApi.markAsRead(notificationId);
```

---

### **markAllAsRead(userId: string)**
Marks all notifications as read.

**Parameters:**
- `userId`: User profile UUID

**Returns:** `Promise<void>`

**Example:**
```typescript
await notificationsApi.markAllAsRead(userId);
```

---

### **subscribeToNotifications(userId: string, callback: Function)**
Subscribes to real-time notifications.

**Parameters:**
- `userId`: User profile UUID
- `callback`: Function called when new notification arrives

**Returns:** `Function` (unsubscribe function)

**Example:**
```typescript
const unsubscribe = notificationsApi.subscribeToNotifications(
  userId,
  (notification) => {
    toast.success(notification.title);
  }
);

// Later, to unsubscribe:
unsubscribe();
```

---

## **Error Handling**

All API functions throw errors that should be caught:

```typescript
try {
  await menuApi.createItem(newItem);
} catch (error) {
  console.error('Failed to create item:', error.message);
}
```

Common error types:
- **Authentication errors**: Invalid credentials, session expired
- **Permission errors**: Insufficient privileges for operation
- **Validation errors**: Invalid data format or missing required fields
- **Not found errors**: Resource doesn't exist
- **Conflict errors**: Duplicate entries, constraint violations

---

## **Type Definitions**

```typescript
interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'admin';
  student_id?: string;
  department?: string;
  staff_id?: string;
  cafeteria_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  is_vegetarian: boolean;
  image_url?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  order_number: string;
  student_id: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  subtotal: number;
  tax: number;
  total: number;
  payment_method: 'upi' | 'card' | 'razorpay';
  payment_status: 'pending' | 'completed' | 'failed';
  notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'order' | 'offer' | 'alert' | 'system';
  is_read: boolean;
  is_important: boolean;
  related_order_id?: string;
  created_at: string;
}
```

---

## **Rate Limits**

Supabase default rate limits:
- **Authentication**: 30 requests per hour per IP
- **API requests**: 100 requests per second (burst)
- **Real-time connections**: 200 concurrent connections

For production, consider upgrading Supabase plan or implementing client-side throttling.

---

## **Best Practices**

1. **Always handle errors**
   ```typescript
   try {
     await ordersApi.createOrder(studentId, 'upi');
   } catch (error) {
     // Show user-friendly error message
   }
   ```

2. **Use TypeScript types**
   ```typescript
   const items: MenuItem[] = await menuApi.getAllItems();
   ```

3. **Optimize queries**
   ```typescript
   // Instead of multiple calls
   const cart = await cartApi.getCart(studentId); // Gets full details
   ```

4. **Subscribe to real-time updates**
   ```typescript
   // For order tracking, notifications
   notificationsApi.subscribeToNotifications(userId, handleNewNotification);
   ```

5. **Cache frequently accessed data**
   ```typescript
   // Cache menu items in React state/context
   const [menuItems, setMenuItems] = useState([]);
   ```

---

**Version**: 1.0.0
**Last Updated**: 2025-10-31
