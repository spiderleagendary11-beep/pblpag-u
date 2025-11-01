import { ArrowLeft, Minus, Plus, Trash2, CreditCard, Smartphone, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

interface CartPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const cartItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    price: 120,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    price: 100,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
];

export function CartPage({ onBack, onNavigate }: CartPageProps) {
  const [items, setItems] = useState(cartItems);
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'razorpay'>('upi');
  const [showSuccess, setShowSuccess] = useState(false);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handleConfirmOrder = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('tracking');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-xl">Cart</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Cart Items */}
        {items.map((item) => (
          <Card key={item.id} className="p-4 bg-white shadow-md">
            <div className="flex space-x-3">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{item.name}</h3>
                <p className="text-[#2563EB] mb-2">₹{item.price}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-gray-900 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="self-start p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </Card>
        ))}

        {/* Total Summary */}
        <Card className="p-4 bg-white border-2 border-[#14B8A6]/20">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div>
          <h2 className="text-gray-900 text-lg mb-3">Payment Method</h2>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedPayment('upi')}
              className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 ${
                selectedPayment === 'upi'
                  ? 'border-[#2563EB] bg-[#2563EB]/5'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Smartphone className="w-6 h-6 text-[#2563EB]" />
              <span className="text-gray-900">UPI Payment</span>
            </button>
            <button
              onClick={() => setSelectedPayment('card')}
              className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 ${
                selectedPayment === 'card'
                  ? 'border-[#2563EB] bg-[#2563EB]/5'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <CreditCard className="w-6 h-6 text-[#2563EB]" />
              <span className="text-gray-900">Credit/Debit Card</span>
            </button>
            <button
              onClick={() => setSelectedPayment('razorpay')}
              className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 ${
                selectedPayment === 'razorpay'
                  ? 'border-[#2563EB] bg-[#2563EB]/5'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="w-6 h-6 bg-[#2563EB] rounded flex items-center justify-center text-white text-xs">
                R
              </div>
              <span className="text-gray-900">Razorpay</span>
            </button>
          </div>
        </div>

        {/* Confirm Order Button */}
        <Button
          onClick={handleConfirmOrder}
          className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl py-6 shadow-lg"
        >
          Confirm Order • ₹{total}
        </Button>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="max-w-sm mx-auto">
          <AlertDialogHeader className="items-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <AlertDialogTitle className="text-center">Order Placed Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your order has been confirmed and will be ready soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
