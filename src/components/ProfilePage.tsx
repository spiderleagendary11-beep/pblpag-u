import { ArrowLeft, User, Package, CreditCard, MessageSquare, LogOut, Edit } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ProfilePageProps {
  onBack: () => void;
  onLogout: () => void;
}

const menuItems = [
  { icon: Package, label: 'My Orders', description: 'View your order history' },
  { icon: CreditCard, label: 'Payment History', description: 'Track your payments' },
  { icon: MessageSquare, label: 'Feedback', description: 'Share your experience' },
];

export function ProfilePage({ onBack, onLogout }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#2563EB]/90 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Profile</h1>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center pb-6">
          <Avatar className="w-24 h-24 mb-4 border-4 border-white/20">
            <AvatarFallback className="bg-white/20 text-white text-2xl">AJ</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl mb-1">Alex Johnson</h2>
          <p className="text-white/80 text-sm mb-1">alex.johnson@university.edu</p>
          <p className="text-white/70 text-sm">Student ID: STU-2025-001</p>
          <Button
            variant="secondary"
            className="mt-4 bg-white/20 text-white hover:bg-white/30 rounded-xl backdrop-blur-sm"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900">
          <circle cx="50" cy="50" r="30" fill="currentColor" />
          <circle cx="50" cy="40" r="12" fill="white" />
          <path d="M50 52 Q35 58 28 72 Q40 70 50 70 Q60 70 72 72 Q65 58 50 52 Z" fill="white" />
        </svg>
      </div>

      <div className="p-4 space-y-3 relative z-10">
        {/* Menu Items */}
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="p-4 bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{item.label}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Logout Button */}
        <Card
          onClick={onLogout}
          className="p-4 bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow border-2 border-red-100"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-500 mb-1">Logout</h3>
              <p className="text-gray-600 text-sm">Sign out of your account</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
