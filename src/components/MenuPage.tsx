import { ArrowLeft, Search, Filter, Plus, ShoppingCart } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface MenuPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  cartCount: number;
  onAddToCart: () => void;
}

const allMenuItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    price: 120,
    image: 'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Main Course',
    veg: false,
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    price: 100,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Main Course',
    veg: true,
  },
  {
    id: 3,
    name: 'Veg Sandwich',
    price: 60,
    image: 'https://images.unsplash.com/photo-1656082496396-40c7a68d6fa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Breakfast',
    veg: true,
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    price: 150,
    image: 'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Fast Food',
    veg: true,
  },
  {
    id: 5,
    name: 'Chicken Burger',
    price: 110,
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Fast Food',
    veg: false,
  },
  {
    id: 6,
    name: 'Pasta Alfredo',
    price: 130,
    image: 'https://images.unsplash.com/photo-1628079251261-624e723b7326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Main Course',
    veg: true,
  },
  {
    id: 7,
    name: 'Chocolate Cake',
    price: 80,
    image: 'https://images.unsplash.com/photo-1707569859750-b1a954a9de3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Dessert',
    veg: true,
  },
  {
    id: 8,
    name: 'Thali Special',
    price: 140,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    category: 'Main Course',
    veg: true,
  },
];

export function MenuPage({ onBack, onNavigate, cartCount, onAddToCart }: MenuPageProps) {
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const filteredItems = allMenuItems.filter((item) => {
    if (filter === 'veg') return item.veg;
    if (filter === 'non-veg') return !item.veg;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900 text-xl">Menu</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for dishes..."
            className="pl-10 pr-4 rounded-xl bg-gray-100 border-0"
          />
        </div>

        {/* Filters */}
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
            onClick={() => setFilter('veg')}
            className={`cursor-pointer ${
              filter === 'veg'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🟢 Veg
          </Badge>
          <Badge
            onClick={() => setFilter('non-veg')}
            className={`cursor-pointer ${
              filter === 'non-veg'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔴 Non-Veg
          </Badge>
          <button className="ml-auto p-2 bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white shadow-md overflow-hidden">
            <div className="relative">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover"
              />
              <div
                className={`absolute top-2 right-2 w-6 h-6 rounded-full ${
                  item.veg ? 'bg-green-500' : 'bg-red-500'
                } flex items-center justify-center`}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
              <p className="text-gray-500 text-xs mb-2">{item.category}</p>
              <div className="flex items-center justify-between">
                <p className="text-[#2563EB]">₹{item.price}</p>
                <Button
                  size="sm"
                  onClick={onAddToCart}
                  className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-lg h-8 px-3"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={() => onNavigate('cart')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#14B8A6] text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#2563EB] text-white rounded-full text-xs flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      )}
    </div>
  );
}
