import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Hash, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface StudentAuthProps {
  onBack: () => void;
  onLogin: () => void;
}

export function StudentAuth({ onBack, onLogin }: StudentAuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      {/* Header */}
      <div className="bg-[#2563EB] text-white p-4 flex items-center">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">{isLogin ? 'Student Login' : 'Student Signup'}</h1>
      </div>

      <div className="p-6">
        <Card className="max-w-md mx-auto p-6 shadow-lg bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 rounded-xl border-gray-300"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 rounded-xl border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 rounded-xl border-gray-300"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-700">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10 rounded-xl border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-id" className="text-gray-700">Student ID</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="student-id"
                      type="text"
                      placeholder="Enter your student ID"
                      className="pl-10 rounded-xl border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-gray-700">Department</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="department"
                      type="text"
                      placeholder="Enter your department"
                      className="pl-10 rounded-xl border-gray-300"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl py-6 shadow-lg"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#2563EB] text-sm"
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
              </button>
            </div>
          </form>

          <div className="mt-6 flex justify-end">
            <div className="w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#2563EB]">
                <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.2" />
                <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
