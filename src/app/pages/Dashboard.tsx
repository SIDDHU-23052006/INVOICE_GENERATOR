import React from 'react';
import { DollarSign, FileText, Users as UsersIcon, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$0',
      subtitle: '12% vs last month',
      icon: DollarSign,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      increase: true,
    },
    {
      title: 'Invoices Sent',
      value: '0',
      subtitle: '0 Pending Payment',
      icon: FileText,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Clients',
      value: '1',
      subtitle: 'Total Active Clients',
      icon: UsersIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Paid Invoices',
      value: '0',
      subtitle: 'Fully settled',
      icon: ShoppingCart,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name || 'User'} 👋
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-semibold">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {stat.increase && (
                  <span className="text-green-600 text-sm">↑ </span>
                )}
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Invoices */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Recent Invoices</h3>
          <div className="flex items-center justify-center h-64 text-gray-500">
            No recent activity.
          </div>
        </Card>
      </div>
    </div>
  );
};
