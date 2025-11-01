import { ArrowLeft, Search, Filter, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState } from 'react';

interface AdminOrdersProps {
  onBack: () => void;
}

const orders = [
  {
    id: '#ORD-1234',
    customer: 'Alex Johnson',
    items: ['Chicken Biryani x2', 'Paneer Butter Masala x1'],
    total: 340,
    status: 'pending',
    time: '2 mins ago',
  },
  {
    id: '#ORD-1235',
    customer: 'Sarah Smith',
    items: ['Pizza Margherita x1', 'Pasta Alfredo x1'],
    total: 280,
    status: 'preparing',
    time: '5 mins ago',
  },
  {
    id: '#ORD-1236',
    customer: 'Mike Brown',
    items: ['Veg Sandwich x2'],
    total: 120,
    status: 'ready',
    time: '8 mins ago',
  },
  {
    id: '#ORD-1237',
    customer: 'Emma Wilson',
    items: ['Thali Special x1', 'Chocolate Cake x1'],
    total: 220,
    status: 'completed',
    time: '15 mins ago',
  },
];

export function AdminOrders({ onBack }: AdminOrdersProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready' | 'completed'>('all');

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500';
      case 'preparing':
        return 'bg-blue-500';
      case 'ready':
        return 'bg-teal-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-xl">Manage Orders</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 rounded-xl bg-gray-100 border-0"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Badge
            onClick={() => setFilter('all')}
            className={`cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#14B8A6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </Badge>
          <Badge
            onClick={() => setFilter('pending')}
            className={`cursor-pointer whitespace-nowrap ${
              filter === 'pending'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </Badge>
          <Badge
            onClick={() => setFilter('preparing')}
            className={`cursor-pointer whitespace-nowrap ${
              filter === 'preparing'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Preparing
          </Badge>
          <Badge
            onClick={() => setFilter('ready')}
            className={`cursor-pointer whitespace-nowrap ${
              filter === 'ready'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Ready
          </Badge>
          <Badge
            onClick={() => setFilter('completed')}
            className={`cursor-pointer whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </Badge>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-4 bg-white shadow-md">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-gray-900 mb-1">{order.id}</h3>
                <p className="text-gray-600 text-sm">{order.customer}</p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>

            <div className="mb-3">
              {order.items.map((item, index) => (
                <p key={index} className="text-gray-600 text-sm">
                  • {item}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-900">Total: ₹{order.total}</p>
              <p className="text-gray-500 text-sm">{order.time}</p>
            </div>

            {order.status !== 'completed' && (
              <div className="flex items-center space-x-2">
                {order.status === 'pending' && (
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Start Preparing
                  </Button>
                )}
                {order.status === 'preparing' && (
                  <Button
                    size="sm"
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Ready
                  </Button>
                )}
                {order.status === 'ready' && (
                  <Button
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Complete Order
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
