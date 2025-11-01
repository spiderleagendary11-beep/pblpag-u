# 🍽️ Smart AI Cafeteria - Complete Backend Solution

A modern, serverless backend for cafeteria management built with **Supabase**, featuring real-time updates, comprehensive analytics, and enterprise-grade security.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Deployment](#-deployment)
- [Testing](#-testing)

---

## ✨ Features

### **For Students**
- 🔐 Secure authentication with email/password
- 🍕 Browse menu with search and filters
- 🛒 Shopping cart management
- 💳 Multiple payment methods (UPI, Card, Razorpay)
- 📦 Real-time order tracking
- 🔔 Push notifications for order updates
- 📜 Order history with reorder functionality
- 👤 Profile management

### **For Admins**
- 🔑 Admin authentication and authorization
- 📊 Comprehensive dashboard with analytics
- 🍔 Menu item management (CRUD operations)
- 📋 Order management with status updates
- 📈 Sales reports and statistics
- 📅 Daily, weekly, monthly revenue tracking
- 🏆 Top-selling items analysis
- 📱 Customer notifications

### **Technical Features**
- ⚡ Real-time updates via WebSockets
- 🔒 Row Level Security (RLS) policies
- 🚀 Auto-generated REST API
- 📝 TypeScript type safety
- 🎯 Business logic in database functions
- 📊 Advanced analytics and reporting
- 🔄 Automatic cart-to-order conversion
- 🔔 Event-driven notifications

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Database** | PostgreSQL (Supabase) |
| **Authentication** | Supabase Auth (JWT) |
| **API** | Supabase REST API |
| **Real-time** | Supabase Realtime |
| **Client** | TypeScript + React |
| **Security** | Row Level Security (RLS) |
| **Deployment** | Serverless (Supabase Cloud) |

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- Supabase account (free tier available)
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/smart-cafeteria.git
cd smart-cafeteria
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Setup Supabase**

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. The database migrations have already been applied via Supabase MCP

### **4. Configure Environment**

Create a `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### **5. Start Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
smart-cafeteria/
├── src/
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client configuration
│   │   ├── database.types.ts        # TypeScript types from database
│   │   └── api/
│   │       ├── auth.ts              # Authentication API
│   │       ├── menu.ts              # Menu management API
│   │       ├── cart.ts              # Cart operations API
│   │       ├── orders.ts            # Orders API
│   │       ├── notifications.ts     # Notifications API
│   │       └── index.ts             # API exports
│   ├── components/                  # React components
│   └── App.tsx                      # Main application
├── .env                             # Environment variables
├── BACKEND_DOCUMENTATION.md         # Detailed backend docs
├── API_REFERENCE.md                 # Complete API reference
└── README.md                        # This file
```

---

## 🗄️ Database Schema

### **Core Tables**

```
profiles
├── id (uuid, PK)
├── email (text, unique)
├── full_name (text)
├── role (student | admin)
├── student_id (text)
├── department (text)
├── staff_id (text)
└── cafeteria_name (text)

menu_items
├── id (uuid, PK)
├── name (text)
├── price (numeric)
├── category (text)
├── is_vegetarian (boolean)
├── image_url (text)
└── is_available (boolean)

orders
├── id (uuid, PK)
├── order_number (text, unique)
├── student_id (uuid, FK → profiles)
├── status (text)
├── subtotal (numeric)
├── tax (numeric)
├── total (numeric)
├── payment_method (text)
└── payment_status (text)

order_items
├── id (uuid, PK)
├── order_id (uuid, FK → orders)
├── menu_item_id (uuid, FK → menu_items)
├── quantity (integer)
├── price_at_order (numeric)
└── subtotal (numeric)

cart_items
├── id (uuid, PK)
├── student_id (uuid, FK → profiles)
├── menu_item_id (uuid, FK → menu_items)
└── quantity (integer)

notifications
├── id (uuid, PK)
├── user_id (uuid, FK → profiles)
├── title (text)
├── message (text)
├── type (text)
├── is_read (boolean)
└── related_order_id (uuid, FK → orders)
```

### **Database Functions**

| Function | Purpose |
|----------|---------|
| `generate_order_number()` | Auto-generates sequential order IDs |
| `create_order_from_cart()` | Converts cart to order |
| `update_order_status()` | Updates order & sends notification |
| `get_order_summary()` | Gets order with all details |
| `get_sales_statistics()` | Comprehensive analytics |
| `add_to_cart()` | Adds/updates cart items |
| `get_cart_with_items()` | Gets cart with prices |
| `clear_cart()` | Empties cart |

---

## 📚 API Documentation

### **Quick Examples**

#### **Authentication**
```typescript
import { authApi } from './lib/api';

// Student Signup
await authApi.signupStudent({
  email: 'student@uni.edu',
  password: 'SecurePass123!',
  fullName: 'John Doe',
  studentId: 'STU-001',
  department: 'CS'
});

// Login
const { user, session } = await authApi.login({
  email: 'student@uni.edu',
  password: 'SecurePass123!'
});
```

#### **Menu Operations**
```typescript
import { menuApi } from './lib/api';

// Get all items
const items = await menuApi.getAllItems();

// Search
const results = await menuApi.searchItems('pizza');

// Create item (admin)
await menuApi.createItem({
  name: 'Margherita Pizza',
  price: 150,
  category: 'Fast Food',
  is_vegetarian: true
});
```

#### **Cart & Orders**
```typescript
import { cartApi, ordersApi } from './lib/api';

// Add to cart
await cartApi.addToCart(studentId, menuItemId, 2);

// Get cart total
const { total } = await cartApi.getCartTotal(studentId);

// Create order
const orderId = await ordersApi.createOrder(studentId, 'upi');

// Track order
const order = await ordersApi.getOrderById(orderId);
```

#### **Notifications**
```typescript
import { notificationsApi } from './lib/api';

// Subscribe to real-time updates
const unsubscribe = notificationsApi.subscribeToNotifications(
  userId,
  (notification) => {
    console.log('New notification:', notification);
  }
);
```

For complete API documentation, see [API_REFERENCE.md](./API_REFERENCE.md)

---

## 🔒 Security

### **Implemented Security Features**

✅ **Row Level Security (RLS)** on all tables
- Students can only access their own data
- Admins have elevated permissions
- Public can only view available menu items

✅ **JWT Authentication**
- Secure token-based auth
- Automatic session management
- Secure password hashing

✅ **SQL Injection Prevention**
- Parameterized queries
- Input validation at database level

✅ **HTTPS Only**
- All communication encrypted
- Secure API keys

### **Security Best Practices**

```typescript
// ✅ Good: Use provided API functions
await ordersApi.updateOrderStatus(orderId, 'preparing');

// ❌ Bad: Direct database manipulation
// await supabase.from('orders').update({ status: 'preparing' });
```

**Important**: Never expose your `service_role` key in client code. Use the `anon` key provided.

---

## 🌐 Deployment

### **Supabase (Backend)**

Your backend is already deployed on Supabase! Just ensure:

1. ✅ Migrations are applied (already done via MCP)
2. ✅ RLS policies are enabled (already configured)
3. ✅ Environment variables are set

### **Frontend Deployment**

#### **Vercel**
```bash
npm run build
vercel --prod
```

Set environment variables in Vercel dashboard.

#### **Netlify**
```bash
npm run build
netlify deploy --prod --dir=build
```

Set environment variables in Netlify dashboard.

#### **Manual Deployment**
```bash
npm run build
# Deploy 'build' folder to any static host
```

---

## 🧪 Testing

### **Manual Testing**

1. **Create Test Accounts**
   ```
   Student: student@test.com / Test123!
   Admin: admin@test.com / Admin123!
   ```

2. **Test Student Flow**
   - Sign up → Browse menu → Add to cart → Place order → Track

3. **Test Admin Flow**
   - Sign up → View dashboard → Manage orders → Update menu

### **Database Testing**

Use Supabase SQL Editor:

```sql
-- Get all orders
SELECT * FROM orders ORDER BY created_at DESC;

-- Get cart items with details
SELECT * FROM get_cart_with_items('user-id-here');

-- Get sales statistics
SELECT * FROM get_sales_statistics();
```

### **API Testing**

Use Supabase API Explorer or tools like Postman:

```bash
# Get menu items
GET https://your-project.supabase.co/rest/v1/menu_items
Authorization: Bearer YOUR_ANON_KEY

# Create order
POST https://your-project.supabase.co/rest/v1/rpc/create_order_from_cart
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "student_id_param": "uuid-here",
  "payment_method_param": "upi"
}
```

---

## 📊 Analytics & Monitoring

### **Available Metrics**

The system tracks:
- 📈 Total orders and revenue
- 📊 Orders by status (pending, preparing, ready, completed)
- 🏆 Top-selling items
- 📅 Daily/weekly/monthly sales
- 🍕 Revenue by category
- ⏱️ Average order completion time

### **Viewing Analytics**

```typescript
const stats = await ordersApi.getOrderStats();

console.log(`Total Revenue: ₹${stats.total_revenue}`);
console.log(`Pending Orders: ${stats.pending_orders}`);
console.log(`Top Item: ${stats.top_items[0].name}`);
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 📞 Support

- 📚 Documentation: See `BACKEND_DOCUMENTATION.md`
- 🔗 API Reference: See `API_REFERENCE.md`
- 🐛 Issues: GitHub Issues
- 📧 Email: support@example.com

---

## 🎯 Roadmap

- [ ] AI-powered meal recommendations
- [ ] QR code-based ordering
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Loyalty rewards system
- [ ] Inventory management
- [ ] Advanced analytics dashboard
- [ ] Integration with payment gateways

---

## 🙏 Acknowledgments

- Built with [Supabase](https://supabase.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Made with ❤️ for modern cafeteria management**

**Version**: 1.0.0 | **Last Updated**: 2025-10-31
