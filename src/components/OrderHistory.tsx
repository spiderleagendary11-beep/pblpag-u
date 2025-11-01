import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface OrderHistoryProps {
  onBack: () => void;
}

const orders = [
  {
    id: '#ORD-1234',
    date: 'Oct 12, 2025',
    total: 340,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    items: 'Chicken Biryani, Paneer Butter Masala',
  },
  {
    id: '#ORD-1233',
    date: 'Oct 11, 2025',
    total: 210,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    items: 'Pizza Margherita, Pasta Alfredo',
  },
  {
    id: '#ORD-1232',
    date: 'Oct 10, 2025',
    total: 180,
    status: 'cancelled',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    items: 'Chicken Burger, Veg Sandwich',
  },
  {
    id: '#ORD-1231',
    date: 'Oct 9, 2025',
    total: 140,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    items: 'Thali Special',
  },
];

export function OrderHistory({ onBack }: OrderHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-xl">Order History</h1>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-2">
          <Badge
            onClick={() => setFilter('all')}
            className={`cursor-pointer ${
              filter === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </Badge>
          <Badge
            onClick={() => setFilter('completed')}
            className={`cursor-pointer ${
              filter === 'completed'
                ? 'bg-[#14B8A6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </Badge>
          <Badge
            onClick={() => setFilter('cancelled')}
            className={`cursor-pointer ${
              filter === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancelled
          </Badge>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-4 bg-white shadow-md">
            <div className="flex space-x-3">
              <ImageWithFallback
                src={order.image}
                alt={order.items}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-[#2563EB] mb-1">{order.id}</h3>
                    <p className="text-gray-500 text-sm">{order.date}</p>
                  </div>
                  <Badge
                    className={
                      order.status === 'completed'
                        ? 'bg-[#14B8A6]'
                        : 'bg-red-500'
                    }
                  >
                    {order.status === 'completed' ? 'Completed' : 'Cancelled'}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2">{order.items}</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-900">₹{order.total}</p>
                  {order.status === 'completed' && (
                    <Button
                      size="sm"
                      className="bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white rounded-lg h-8"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
