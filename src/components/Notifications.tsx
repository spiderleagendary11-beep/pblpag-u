import { ArrowLeft, Bell, CheckCheck, Package, Tag, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface NotificationsProps {
  onBack: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Ready for Pickup',
    message: 'Your order #ORD-1234 is ready to be picked up',
    time: '5 mins ago',
    important: true,
    read: false,
  },
  {
    id: 2,
    type: 'offer',
    title: 'Special Offer',
    message: 'Get 20% off on orders above ₹200 today!',
    time: '1 hour ago',
    important: false,
    read: false,
  },
  {
    id: 3,
    type: 'alert',
    title: 'Payment Successful',
    message: 'Your payment of ₹340 has been processed successfully',
    time: '2 hours ago',
    important: false,
    read: true,
  },
  {
    id: 4,
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #ORD-1233 has been confirmed',
    time: '3 hours ago',
    important: false,
    read: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'order':
      return Package;
    case 'offer':
      return Tag;
    case 'alert':
      return AlertCircle;
    default:
      return Bell;
  }
};

export function Notifications({ onBack }: NotificationsProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-gray-900 text-xl">Notifications</h1>
          </div>
          <Button variant="ghost" className="text-[#14B8A6] text-sm">
            <CheckCheck className="w-4 h-4 mr-1" />
            Mark all read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <Card
              key={notification.id}
              className={`p-4 ${
                notification.important
                  ? 'bg-[#2563EB] text-white shadow-lg'
                  : notification.read
                  ? 'bg-white opacity-60'
                  : 'bg-white'
              } shadow-md`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.important
                      ? 'bg-white/20'
                      : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      notification.important ? 'text-white' : 'text-gray-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`mb-1 ${
                      notification.important ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <p
                    className={`text-sm mb-2 ${
                      notification.important ? 'text-white/90' : 'text-gray-600'
                    }`}
                  >
                    {notification.message}
                  </p>
                  <p
                    className={`text-xs ${
                      notification.important ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {notification.time}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
