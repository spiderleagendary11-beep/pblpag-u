import { ArrowLeft, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

interface MenuManagementProps {
  onBack: () => void;
}

const menuItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    price: 120,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    price: 100,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 3,
    name: 'Veg Sandwich',
    price: 60,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1656082496396-40c7a68d6fa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    price: 150,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
];

export function MenuManagement({ onBack }: MenuManagementProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-gray-900 text-xl">Menu Management</h1>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#14B8A6] to-[#14B8A6]/80 text-white rounded-xl">
                <Plus className="w-5 h-5 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Menu Item</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Item Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#14B8A6]">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Click to upload image</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input placeholder="Enter item name" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" placeholder="Enter price" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input placeholder="Enter category" className="rounded-xl" />
                </div>
                <Button className="w-full bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white rounded-xl py-6">
                  Add Item
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-4 grid grid-cols-1 gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="bg-white shadow-md overflow-hidden">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
                <p className="text-[#14B8A6] text-lg">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6]/10 rounded-lg"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
