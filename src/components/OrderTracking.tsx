import { ArrowLeft, Package, ChefHat, CheckCircle, ShoppingBag, HelpCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderTrackingProps {
  onBack: () => void;
}

const orderStages = [
  { id: 1, label: 'Ordered', icon: Package, completed: true },
  { id: 2, label: 'Preparing', icon: ChefHat, completed: true },
  { id: 3, label: 'Ready', icon: CheckCircle, completed: false },
  { id: 4, label: 'Picked Up', icon: ShoppingBag, completed: false },
];

const orderItems = [
  {
    name: 'Chicken Biryani',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Paneer Butter Masala',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
];

export function OrderTracking({ onBack }: OrderTrackingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-xl">Order Tracking</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Order Info Card */}
        <Card className="p-6 bg-white shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-gray-900 text-2xl mb-1">Order #ORD-1234</h2>
            <p className="text-gray-600">Expected in 15 minutes</p>
          </div>

          {/* Progress Tracker */}
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
              <div className="h-full bg-[#14B8A6] transition-all duration-500" style={{ width: '50%' }}></div>
            </div>
            <div className="relative flex justify-between">
              {orderStages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.id} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        stage.completed
                          ? 'bg-[#14B8A6] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <p
                      className={`text-xs text-center ${
                        stage.completed ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <Card className="p-4 bg-white shadow-md">
          <h3 className="text-gray-900 text-lg mb-4">Order Details</h3>
          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900">{item.name}</h4>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-900">
              <span>Total Amount</span>
              <span>₹340</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 rounded-xl py-6"
          >
            Cancel Order
          </Button>
          <Button className="flex-1 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl py-6">
            <HelpCircle className="w-5 h-5 mr-2" />
            Help
          </Button>
        </div>
      </div>
    </div>
  );
}
