import { ArrowLeft, TrendingUp, IndianRupee, Clock, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SalesReportProps {
  onBack: () => void;
}

const salesData = [
  { name: 'Mon', sales: 4200 },
  { name: 'Tue', sales: 3800 },
  { name: 'Wed', sales: 5200 },
  { name: 'Thu', sales: 4800 },
  { name: 'Fri', sales: 6100 },
  { name: 'Sat', sales: 5500 },
  { name: 'Sun', sales: 4900 },
];

const categoryData = [
  { name: 'Main Course', value: 45 },
  { name: 'Fast Food', value: 30 },
  { name: 'Breakfast', value: 15 },
  { name: 'Dessert', value: 10 },
];

const COLORS = ['#2563EB', '#14B8A6', '#F59E0B', '#EF4444'];

const summaryStats = [
  { label: 'Orders Today', value: '156', icon: TrendingUp, color: 'blue' },
  { label: 'Total Revenue', value: '₹24,580', icon: IndianRupee, color: 'teal' },
  { label: 'Peak Hour', value: '1:00 PM', icon: Clock, color: 'orange' },
];

export function SalesReport({ onBack }: SalesReportProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-gray-900 text-xl">Sales Report</h1>
          </div>
          <Button variant="outline" className="border-gray-300 text-gray-700 rounded-xl">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 Days
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-4">
          {summaryStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4 bg-white shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 text-${stat.color}-500`} />
                </div>
                <h3 className="text-gray-900 text-2xl mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Sales Chart */}
        <Card className="p-6 bg-white shadow-md">
          <h3 className="text-gray-900 text-lg mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-white shadow-md">
          <h3 className="text-gray-900 text-lg mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.slice(0, 8)} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Selling Items */}
        <Card className="p-6 bg-white shadow-md">
          <h3 className="text-gray-900 text-lg mb-4">Top Selling Items</h3>
          <div className="space-y-3">
            {[
              { name: 'Chicken Biryani', orders: 45, revenue: '₹5,400' },
              { name: 'Pizza Margherita', orders: 38, revenue: '₹5,700' },
              { name: 'Paneer Butter Masala', orders: 32, revenue: '₹3,200' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-gray-900">{item.name}</h4>
                  <p className="text-gray-600 text-sm">{item.orders} orders</p>
                </div>
                <p className="text-[#14B8A6]">{item.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
