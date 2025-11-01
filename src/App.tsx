import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { UserSelection } from './components/UserSelection';
import { StudentAuth } from './components/StudentAuth';
import { AdminAuth } from './components/AdminAuth';
import { StudentDashboard } from './components/StudentDashboard';
import { MenuPage } from './components/MenuPage';
import { CartPage } from './components/CartPage';
import { OrderTracking } from './components/OrderTracking';
import { OrderHistory } from './components/OrderHistory';
import { AdminDashboard } from './components/AdminDashboard';
import { MenuManagement } from './components/MenuManagement';
import { SalesReport } from './components/SalesReport';
import { Notifications } from './components/Notifications';
import { ProfilePage } from './components/ProfilePage';
import { AdminOrders } from './components/AdminOrders';

type Screen = 
  | 'splash'
  | 'user-selection'
  | 'student-auth'
  | 'admin-auth'
  | 'dashboard'
  | 'menu'
  | 'cart'
  | 'tracking'
  | 'orders'
  | 'profile'
  | 'notifications'
  | 'admin-dashboard'
  | 'menu-management'
  | 'admin-orders'
  | 'reports'
  | 'admin-notifications';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [cartCount, setCartCount] = useState(3);

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleLogout = () => {
    setCurrentScreen('user-selection');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile Container - centered on larger screens */}
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative">
        {currentScreen === 'splash' && (
          <SplashScreen onGetStarted={() => handleNavigation('user-selection')} />
        )}

        {currentScreen === 'user-selection' && (
          <UserSelection
            onSelectStudent={() => handleNavigation('student-auth')}
            onSelectAdmin={() => handleNavigation('admin-auth')}
          />
        )}

        {currentScreen === 'student-auth' && (
          <StudentAuth
            onBack={() => handleNavigation('user-selection')}
            onLogin={() => handleNavigation('dashboard')}
          />
        )}

        {currentScreen === 'admin-auth' && (
          <AdminAuth
            onBack={() => handleNavigation('user-selection')}
            onLogin={() => handleNavigation('admin-dashboard')}
          />
        )}

        {currentScreen === 'dashboard' && (
          <StudentDashboard
            onNavigate={handleNavigation}
            cartCount={cartCount}
          />
        )}

        {currentScreen === 'menu' && (
          <MenuPage
            onBack={() => handleNavigation('dashboard')}
            onNavigate={handleNavigation}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentScreen === 'cart' && (
          <CartPage
            onBack={() => handleNavigation('dashboard')}
            onNavigate={handleNavigation}
          />
        )}

        {currentScreen === 'tracking' && (
          <OrderTracking onBack={() => handleNavigation('dashboard')} />
        )}

        {currentScreen === 'orders' && (
          <OrderHistory onBack={() => handleNavigation('dashboard')} />
        )}

        {currentScreen === 'notifications' && (
          <Notifications onBack={() => handleNavigation('dashboard')} />
        )}

        {currentScreen === 'profile' && (
          <ProfilePage
            onBack={() => handleNavigation('dashboard')}
            onLogout={handleLogout}
          />
        )}

        {/* Admin Screens */}
        {currentScreen === 'admin-dashboard' && (
          <AdminDashboard
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === 'menu-management' && (
          <MenuManagement onBack={() => handleNavigation('admin-dashboard')} />
        )}

        {currentScreen === 'admin-orders' && (
          <AdminOrders onBack={() => handleNavigation('admin-dashboard')} />
        )}

        {currentScreen === 'reports' && (
          <SalesReport onBack={() => handleNavigation('admin-dashboard')} />
        )}
      </div>
    </div>
  );
}
