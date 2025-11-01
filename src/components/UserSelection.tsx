import { GraduationCap, Users } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserSelectionProps {
  onSelectStudent: () => void;
  onSelectAdmin: () => void;
}

export function UserSelection({ onSelectStudent, onSelectAdmin }: UserSelectionProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-gray-900 text-3xl">Continue as</h1>
          <p className="text-gray-600">Select your role to proceed</p>
        </div>

        <div className="space-y-4">
          {/* Student Card */}
          <Card
            onClick={onSelectStudent}
            className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#2563EB] bg-white"
          >
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 text-xl mb-1">Student</h3>
                <p className="text-gray-600 text-sm">Order food and track your meals</p>
              </div>
            </div>
            <div className="mt-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1626201853398-7cba6a8ebd7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Student"
                className="w-full h-32 object-cover rounded-xl opacity-60"
              />
            </div>
          </Card>

          {/* Admin Card */}
          <Card
            onClick={onSelectAdmin}
            className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#14B8A6] bg-white"
          >
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#14B8A6]/10 to-[#14B8A6]/5 flex items-center justify-center">
                <Users className="w-10 h-10 text-[#14B8A6]" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 text-xl mb-1">Admin</h3>
                <p className="text-gray-600 text-sm">Manage cafeteria operations</p>
              </div>
            </div>
            <div className="mt-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1489925461942-d8f490a04588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Admin"
                className="w-full h-32 object-cover rounded-xl opacity-60"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
