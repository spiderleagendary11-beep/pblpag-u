import { Bell, Home, ShoppingCart, Package, User, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
  cartCount: number;
}

const menuItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    price: 120,
    image: 'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Main Course',
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    price: 100,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Main Course',
  },
  {
    id: 3,
    name: 'Veg Sandwich',
    price: 60,
    image: 'https://images.unsplash.com/photo-1656082496396-40c7a68d6fa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Breakfast',
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    price: 150,
    image: 'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Fast Food',
  },
];

const recentOrders = [
  {
    id: '#ORD-1234',
    status: 'Preparing',
    progress: 60,
    time: '10 mins ago',
  },
  {
    id: '#ORD-1233',
    status: 'Ready',
    progress: 100,
    time: '25 mins ago',
  },
];

export function StudentDashboard({ onNavigate, cartCount }: StudentDashboardProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#2563EB]/90 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl mb-1">Hi,Om!</h1>
            <p className="text-white/80 text-sm">What would you like to eat today?</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('notifications')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Today's Menu */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-xl">Today's Menu</h2>
            <button
              onClick={() => onNavigate('menu')}
              className="text-[#2563EB] text-sm"
            >
              View All
            </button>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#2563EB]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#2563EB]/50">
            {menuItems.map((item) => (
              <Card key={item.id} className="min-w-[160px] bg-white shadow-md overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
                  <p className="text-[#2563EB] mb-2">₹{item.price}</p>
                  <Button
                    size="sm"
                    className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-xl">My Orders</h2>
            <button
              onClick={() => onNavigate('orders')}
              className="text-[#2563EB] text-sm"
            >
              See All
            </button>
          </div>
          <div className="space-y-3 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#2563EB]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#2563EB]/50">
            {recentOrders.map((order) => (
              <Card key={order.id} className="p-4 bg-white shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{order.id}</h3>
                    <p className="text-gray-500 text-sm">{order.time}</p>
                  </div>
                  <Badge
                    variant={order.status === 'Ready' ? 'default' : 'secondary'}
                    className={order.status === 'Ready' ? 'bg-[#14B8A6]' : 'bg-[#2563EB]'}
                  >
                    {order.status}
                  </Badge>
                </div>
                <Progress value={order.progress} className="h-2 [&>div]:bg-[#2563EB]" />
              </Card>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex flex-col items-center space-y-1 text-[#2563EB]"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => onNavigate('cart')}
            className="flex flex-col items-center space-y-1 text-gray-500 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#14B8A6] text-white rounded-full text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Package className="w-6 h-6" />
            <span className="text-xs">Orders</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
