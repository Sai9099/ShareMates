import React from 'react';
import { Users, DollarSign, Home, TrendingUp, Calendar, Bell, CheckSquare, Building } from 'lucide-react';
import { User } from '../App';
import { ActiveTab } from './Dashboard';

interface DashboardHomeProps {
  user: User;
  setActiveTab: (tab: ActiveTab) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ user, setActiveTab }) => {
  const quickStats = [
    { label: 'Available Rooms', value: '12', icon: Building, color: 'bg-blue-500' },
    { label: 'Active Roommates', value: '3', icon: Users, color: 'bg-green-500' },
    { label: 'Monthly Expenses', value: '₹92,340', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Savings This Month', value: '₹23,760', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { id: 1, type: 'expense', message: 'Priya added grocery expense: ₹6,350', time: '2 hours ago' },
    { id: 2, type: 'payment', message: 'Rahul paid his share of electricity bill', time: '1 day ago' },
    { id: 3, type: 'roommate', message: 'New roommate request from Ananya', time: '2 days ago' },
    { id: 4, type: 'expense', message: 'Internet bill split among 4 roommates', time: '3 days ago' },
    { id: 5, type: 'chore', message: 'Vikram completed kitchen cleaning task', time: '4 days ago' },
  ];

  return (
    <div className="max-w-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your shared living expenses and roommate connections.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Find Rooms Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <Building className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-2">Find Perfect Rooms</h3>
            <p className="text-blue-100 text-sm mb-4">
              Discover available rooms and properties that match your budget and location preferences.
            </p>
            <button
              onClick={() => setActiveTab('rooms')}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Browse Rooms
            </button>
          </div>
        </div>

        {/* Find Roommates Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <Users className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-2">Find Perfect Roommates</h3>
            <p className="text-purple-100 text-sm mb-4">
              Discover compatible people to share your living space with. Filter by preferences, lifestyle, and budget.
            </p>
            <button
              onClick={() => setActiveTab('roommates')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors duration-200"
            >
              Start Searching
            </button>
          </div>
        </div>

        {/* Expense Sharing Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>
          <div className="relative z-10">
            <DollarSign className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-2">Split Expenses Easily</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Track shared expenses, split bills automatically, and keep everyone accountable with our smart system.
            </p>
            <button
              onClick={() => setActiveTab('expenses')}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors duration-200"
            >
              Manage Expenses
            </button>
          </div>
        </div>

        {/* Chore Assignments Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full transform -translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <CheckSquare className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-2">Manage Chores</h3>
            <p className="text-green-100 text-sm mb-4">
              Assign and track household chores fairly among roommates. Keep your shared space clean and organized.
            </p>
            <button
              onClick={() => setActiveTab('chores')}
              className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors duration-200"
            >
              View Chores
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="space-y-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-medium mb-1">{activity.message}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Notifications */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm font-semibold text-orange-800">Payment Due</span>
              </div>
              <p className="text-orange-700 text-sm">Rent payment due in 3 days</p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm font-semibold text-blue-800">New Match</span>
              </div>
              <p className="text-blue-700 text-sm">3 potential roommates found</p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-semibold text-green-800">Expense Settled</span>
              </div>
              <p className="text-green-700 text-sm">All utilities have been paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;