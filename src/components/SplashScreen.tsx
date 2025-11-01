import { Utensils, Cpu } from 'lucide-react';
import { Button } from './ui/button';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <div className="relative">
              <Utensils className="w-16 h-16 text-white" strokeWidth={1.5} />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#2563EB]" />
              </div>
            </div>
          </div>
        </div>

        {/* App Name */}
        <div className="text-center space-y-2">
          <h1 className="text-white text-4xl tracking-wide">DEQUEUE</h1>
          <p className="text-white/90 text-sm max-w-xs">
            Smart, Fast, and Real-Time Cafeteria Experience
          </p>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={onGetStarted}
          className="mt-12 bg-white text-[#2563EB] hover:bg-white/90 px-12 py-6 rounded-full shadow-xl"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
