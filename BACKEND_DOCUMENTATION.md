# Smart AI Cafeteria - Backend Documentation

## **Project Overview**

The Smart AI Cafeteria backend is a complete serverless solution built on **Supabase** (PostgreSQL database with REST API). It provides authentication, menu management, order processing, cart functionality, notifications, and analytics for a modern cafeteria management system.

### **Technology Stack**
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (JWT-based)
- **API**: Supabase REST API (auto-generated from database schema)
- **Real-time**: Supabase Realtime (WebSocket subscriptions)
- **Client**: TypeScript + React + Supabase JS Client
- **Security**: Row Level Security (RLS) policies

---

## **1. Database Architecture**

### **Tables Overview**

#### **profiles**
Stores user information for both students and admins.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | References auth.users |
| email | text | User email (unique) |
| full_name | text | User's full name |
| role | text | 'student' or 'admin' |
| student_id | text | Student ID (nullable) |
| department | text | Department (nullable) |
| staff_id | text | Staff ID for admins (nullable) |
| cafeteria_name | text | Cafeteria name for admins (nullable) |
| avatar_url | text | Profile picture URL |
| created_at | timestamptz | Account creation time |
| updated_at | timestamptz | Last update time |

#### **menu_items**
Stores all available food items.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique identifier |
| name | text | Item name |
| description | text | Item description |
| price | numeric | Price in INR |
| category | text | 'Main Course', 'Fast Food', etc. |
| is_vegetarian | boolean | Vegetarian flag |
| image_url | text | Item image URL |
| is_available | boolean | Availability status |
| created_by | uuid | Admin who created it |
| created_at | timestamptz | Creation time |
| updated_at | timestamptz | Last update time |

#### **orders**
Stores all customer orders.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique identifier |
| order_number | text | Format: 'ORD-XXXX' |
| student_id | uuid (FK) | Reference to profiles |
| status | text | Order status |
| subtotal | numeric | Order subtotal |
| tax | numeric | Tax amount (5%) |
| total | numeric | Total amount |
| payment_method | text | 'upi', 'card', 'razorpay' |
| payment_status | text | Payment status |
| notes | text | Order notes |
| created_at | timestamptz | Order time |
| updated_at | timestamptz | Last update |
| completed_at | timestamptz | Completion time |

**Status Values**: `pending`, `preparing`, `ready`, `completed`, `cancelled`

#### **order_items**
Stores individual items in each order.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique identifier |
| order_id | uuid (FK) | Reference to orders |
| menu_item_id | uuid (FK) | Reference to menu_items |
| quantity | integer | Item quantity |
| price_at_order | numeric | Price at time of order |
| subtotal | numeric | Quantity × price |
| created_at | timestamptz | Creation time |

#### **cart_items**
Stores items in student shopping carts.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique identifier |
| student_id | uuid (FK) | Reference to profiles |
| menu_item_id | uuid (FK) | Reference to menu_items |
| quantity | integer | Item quantity |
| created_at | timestamptz | Added time |
| updated_at | timestamptz | Last update |

**Constraint**: Unique (student_id, menu_item_id)

#### **notifications**
Stores user notifications.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique identifier |
| user_id | uuid (FK) | Reference to profiles |
| title | text | Notification title |
| message | text | Notification message |
| type | text | 'order', 'offer', 'alert', 'system' |
| is_read | boolean | Read status |
| is_important | boolean | Important flag |
| related_order_id | uuid (FK) | Related order (nullable) |
| created_at | timestamptz | Creation time |

---

## **2. Database Functions**

### **generate_order_number()**
Auto-generates sequential order numbers.
- Returns: `text` (e.g., 'ORD-0001')

### **update_order_status(order_id, new_status)**
Updates order status and creates notification.
- Args: `order_id uuid`, `new_status text`
- Returns: `boolean`
- Side effect: Creates notification

### **get_order_summary(order_id)**
Retrieves complete order details with items.
- Args: `order_id uuid`
- Returns: Order with aggregated items as JSON

### **get_sales_statistics(start_date?, end_date?)**
Gets comprehensive sales analytics.
- Args: `start_date timestamptz`, `end_date timestamptz` (optional)
- Returns: Sales stats, daily breakdown, top items, category breakdown

### **add_to_cart(student_id, menu_item_id, quantity?)**
Adds item to cart or updates quantity.
- Args: `student_id uuid`, `menu_item_id uuid`, `quantity integer`
- Returns: `cart_item_id uuid`

### **get_cart_with_items(student_id)**
Gets cart with full menu item details.
- Args: `student_id uuid`
- Returns: Array of cart items with prices

### **clear_cart(student_id)**
Clears all items from cart.
- Args: `student_id uuid`
- Returns: `void`

### **create_order_from_cart(student_id, payment_method, notes?)**
Creates order from cart items.
- Args: `student_id uuid`, `payment_method text`, `notes text`
- Returns: `order_id uuid`
- Side effects: Clears cart, creates notification

---

## **3. Row Level Security (RLS) Policies**

### **profiles**
- ✓ Users can read their own profile
- ✓ Users can update their own profile
- ✓ Admins can read all profiles

### **menu_items**
- ✓ Anyone (authenticated) can read available menu items
- ✓ Admins can read all menu items (including unavailable)
- ✓ Admins can insert, update, delete menu items

### **orders**
- ✓ Students can read their own orders
- ✓ Students can create orders
- ✓ Admins can read all orders
- ✓ Admins can update order status

### **order_items**
- ✓ Students can read items from their own orders
- ✓ Students can create order items (when creating order)
- ✓ Admins can read all order items

### **cart_items**
- ✓ Students can fully manage their own cart (CRUD)

### **notifications**
- ✓ Users can read their own notifications
- ✓ Users can update their own notifications (mark as read)
- ✓ System can create notifications

---

## **4. API Service Layer**

### **Authentication API (`authApi`)**

```typescript
// Student Signup
await authApi.signupStudent({
  email: 'student@example.com',
  password: 'password123',
  fullName: 'John Doe',
  studentId: 'STU-001',
  department: 'Computer Science'
});

// Admin Signup
await authApi.signupAdmin({
  email: 'admin@example.com',
  password: 'password123',
  fullName: 'Admin User',
  staffId: 'STF-001',
  cafeteriaName: 'Main Cafeteria'
});

// Login
await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get Current User
const profile = await authApi.getCurrentUser();

// Logout
await authApi.logout();
```

### **Menu API (`menuApi`)**

```typescript
// Get all menu items
const items = await menuApi.getAllItems();

// Search items
const results = await menuApi.searchItems('chicken');

// Filter vegetarian items
const vegItems = await menuApi.filterByVegetarian(true);

// Create item (admin only)
await menuApi.createItem({
  name: 'New Item',
  price: 150,
  category: 'Main Course',
  is_vegetarian: true
});

// Update item
await menuApi.updateItem(itemId, { price: 160 });

// Toggle availability
await menuApi.toggleAvailability(itemId, false);
```

### **Cart API (`cartApi`)**

```typescript
// Get cart
const cart = await cartApi.getCart(studentId);

// Add to cart
await cartApi.addToCart(studentId, menuItemId, 2);

// Update quantity
await cartApi.updateCartItemQuantity(cartItemId, 3);

// Remove from cart
await cartApi.removeFromCart(cartItemId);

// Get cart total
const { subtotal, tax, total } = await cartApi.getCartTotal(studentId);

// Clear cart
await cartApi.clearCart(studentId);
```

### **Orders API (`ordersApi`)**

```typescript
// Create order from cart
const orderId = await ordersApi.createOrder(studentId, 'upi', 'No onions');

// Get student orders
const orders = await ordersApi.getStudentOrders(studentId);

// Get all orders (admin)
const allOrders = await ordersApi.getAllOrders();

// Update order status (admin)
await ordersApi.updateOrderStatus(orderId, 'preparing');

// Get order statistics
const stats = await ordersApi.getOrderStats();
```

### **Notifications API (`notificationsApi`)**

```typescript
// Get user notifications
const notifications = await notificationsApi.getUserNotifications(userId);

// Get unread count
const count = await notificationsApi.getUnreadCount(userId);

// Mark as read
await notificationsApi.markAsRead(notificationId);

// Mark all as read
await notificationsApi.markAllAsRead(userId);

// Subscribe to real-time notifications
const unsubscribe = notificationsApi.subscribeToNotifications(
  userId,
  (notification) => {
    console.log('New notification:', notification);
  }
);
```

---

## **5. Setup Instructions**

### **Step 1: Supabase Project Setup**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key

### **Step 2: Run Migrations**
All migrations have been applied via the Supabase MCP tool:
- `create_cafeteria_schema` - Core database schema
- `seed_sample_data` - Sample menu items
- `create_helper_functions` - Business logic functions

### **Step 3: Configure Environment**
Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### **Step 4: Install Dependencies**
```bash
npm install
```

### **Step 5: Start Development Server**
```bash
npm run dev
```

---

## **6. API Endpoints**

Supabase auto-generates REST endpoints:

### **Authentication**
- `POST /auth/v1/signup` - Sign up
- `POST /auth/v1/token?grant_type=password` - Login
- `POST /auth/v1/logout` - Logout
- `GET /auth/v1/user` - Get current user

### **Tables (Auto-generated REST)**
- `GET /rest/v1/profiles` - Get profiles
- `GET /rest/v1/menu_items` - Get menu items
- `POST /rest/v1/menu_items` - Create menu item
- `PATCH /rest/v1/menu_items?id=eq.{id}` - Update item
- `DELETE /rest/v1/menu_items?id=eq.{id}` - Delete item
- `GET /rest/v1/orders` - Get orders
- `POST /rest/v1/orders` - Create order
- `PATCH /rest/v1/orders?id=eq.{id}` - Update order

### **RPC Functions**
- `POST /rest/v1/rpc/get_order_summary`
- `POST /rest/v1/rpc/update_order_status`
- `POST /rest/v1/rpc/get_sales_statistics`
- `POST /rest/v1/rpc/add_to_cart`
- `POST /rest/v1/rpc/get_cart_with_items`
- `POST /rest/v1/rpc/create_order_from_cart`

---

## **7. Security Best Practices**

### **Implemented Security**
✓ Row Level Security on all tables
✓ JWT-based authentication
✓ Secure password hashing (handled by Supabase)
✓ Input validation via database constraints
✓ HTTPS-only communication
✓ API key protection (anon key is safe for public use)

### **Additional Recommendations**
1. Enable email verification in production
2. Implement rate limiting for API calls
3. Use server-side validation for critical operations
4. Enable MFA for admin accounts
5. Regular security audits
6. Monitor suspicious activity

---

## **8. Testing**

### **Sample Test Users**

After running the app, create test users:

**Student Account:**
- Email: student@test.com
- Password: Test123!
- Student ID: STU-2025-001
- Department: Computer Science

**Admin Account:**
- Email: admin@test.com
- Password: Admin123!
- Staff ID: STF-001
- Cafeteria: Main Cafeteria

### **Test Scenarios**

1. **Student Flow**
   - Sign up → Browse menu → Add to cart → Place order → Track order

2. **Admin Flow**
   - Sign up → View orders → Update order status → Manage menu → View reports

---

## **9. Deployment**

### **Supabase (Backend)**
Already deployed when you created the project. Just ensure:
- Migrations are applied
- Environment variables are set
- RLS policies are enabled

### **Frontend Deployment**
Deploy to Vercel, Netlify, or any static host:

```bash
npm run build
# Deploy the 'build' folder
```

Set environment variables on your hosting platform.

---

## **10. Troubleshooting**

### **Common Issues**

**Issue**: "Missing Supabase environment variables"
- Solution: Create `.env` file with correct values

**Issue**: "Permission denied" errors
- Solution: Check RLS policies are correctly set

**Issue**: "Order number already exists"
- Solution: Function auto-generates unique numbers, check for conflicts

**Issue**: Cart not clearing after order
- Solution: Ensure `create_order_from_cart` function is used

---

## **11. Future Enhancements**

### **Potential Features**
- [ ] AI-based meal recommendations
- [ ] Loyalty points system
- [ ] QR code-based order pickup
- [ ] Push notifications (FCM integration)
- [ ] Advanced analytics dashboard
- [ ] Multi-cafeteria support
- [ ] Inventory management
- [ ] Recipe management
- [ ] Dietary restrictions filtering
- [ ] Order scheduling
- [ ] Feedback and rating system

### **Performance Optimizations**
- [ ] Implement caching for menu items
- [ ] Add database indexes for common queries
- [ ] Use materialized views for analytics
- [ ] Implement pagination for large result sets
- [ ] Add image optimization/CDN

---

## **Contact & Support**

For questions or issues:
- Check Supabase documentation: https://supabase.com/docs
- Review RLS policies in Supabase dashboard
- Test API calls in Supabase API explorer

---

**Version**: 1.0.0
**Last Updated**: 2025-10-31
**Database Schema Version**: 1.0
