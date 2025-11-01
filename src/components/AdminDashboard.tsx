import { useState } from 'react';
import { LayoutDashboard, UtensilsCrossed, Package, BarChart3, Bell, LogOut, Clock, CheckCircle, AlertCircle, Menu, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const stats = [
  {
    id: 1,
    label: 'Pending Orders',
    value: 12,
    icon: AlertCircle,
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
  },
  {
    id: 2,
    label: 'In Progress',
    value: 8,
    icon: Clock,
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    id: 3,
    label: 'Completed',
    value: 45,
    icon: CheckCircle,
    color: 'teal',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-600',
  },
];

const recentOrders = [
  { id: '#ORD-1234', customer: 'Alex Johnson', items: 2, status: 'Pending', time: '2 mins ago' },
  { id: '#ORD-1235', customer: 'Sarah Smith', items: 3, status: 'Preparing', time: '5 mins ago' },
  { id: '#ORD-1236', customer: 'Mike Brown', items: 1, status: 'Ready', time: '8 mins ago' },
];

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#14B8A6] to-[#14B8A6]/90 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div>
              <h1 className="text-xl">Admin Dashboard</h1>
              <p className="text-white/80 text-xs">Main Cafeteria</p>
            </div>
          </div>
          <button onClick={() => onNavigate('notifications')}>
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-white border-b border-gray-200 p-4 shadow-lg">
          <nav className="space-y-2">
            <button
              onClick={() => {
                onNavigate('admin-dashboard');
                setMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-[#14B8A6]/10 text-[#14B8A6] rounded-xl"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                onNavigate('menu-management');
                setMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Menu Management</span>
            </button>
            <button
              onClick={() => {
                onNavigate('admin-orders');
                setMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <Package className="w-5 h-5" />
              <span>Orders</span>
            </button>
            <button
              onClick={() => {
                onNavigate('reports');
                setMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Reports</span>
            </button>
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Date Info */}
        <p className="text-gray-600 text-sm">Sunday, October 12, 2025</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.id} className="p-4 bg-white shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <h3 className="text-gray-900 text-3xl">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card className="p-4 bg-white shadow-md">
          <h3 className="text-gray-900 text-lg mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-900">{order.id}</h4>
                  <Badge
                    className={
                      order.status === 'Pending'
                        ? 'bg-orange-500'
                        : order.status === 'Preparing'
                        ? 'bg-blue-500'
                        : 'bg-teal-500'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-gray-600">{order.customer}</p>
                  <span className="text-gray-500">{order.items} items</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{order.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate('menu-management')}
            className="bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white rounded-xl py-6"
          >
            <UtensilsCrossed className="w-5 h-5 mr-2" />
            Manage Menu
          </Button>
          <Button
            onClick={() => onNavigate('reports')}
            className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl py-6"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className="flex flex-col items-center space-y-1 text-[#14B8A6]"
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('menu-management')}
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <UtensilsCrossed className="w-6 h-6" />
            <span className="text-xs">Menu</span>
          </button>
          <button
            onClick={() => onNavigate('admin-orders')}
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <Package className="w-6 h-6" />
            <span className="text-xs">Orders</span>
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="flex flex-col items-center space-y-1 text-gray-500"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
