import React, { useState } from 'react';
import { History as HistoryIcon, Calendar, Filter, Download, Eye, DollarSign, CheckSquare, Users, MessageCircle } from 'lucide-react';
import { User as UserType } from '../App';

interface HistoryProps {
  user: UserType;
}

interface HistoryItem {
  id: string;
  type: 'expense' | 'payment' | 'chore' | 'roommate' | 'message';
  title: string;
  description: string;
  amount?: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  involvedUsers: string[];
}

const History: React.FC<HistoryProps> = ({ user }) => {
  const [filter, setFilter] = useState<'all' | 'expense' | 'payment' | 'chore' | 'roommate' | 'message'>('all');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      type: 'expense',
      title: 'Grocery Shopping',
      description: 'Weekly grocery shopping at Big Bazaar',
      amount: 3240,
      date: '2024-01-15',
      status: 'completed',
      involvedUsers: ['Arjun Sharma', 'Priya Sharma', 'Rahul Gupta']
    },
    {
      id: '2',
      type: 'payment',
      title: 'Electricity Bill Payment',
      description: 'Paid monthly electricity bill',
      amount: 2850,
      date: '2024-01-14',
      status: 'completed',
      involvedUsers: ['Arjun Sharma']
    },
    {
      id: '3',
      type: 'chore',
      title: 'Kitchen Cleaning',
      description: 'Completed weekly kitchen cleaning task',
      date: '2024-01-13',
      status: 'completed',
      involvedUsers: ['Priya Sharma']
    },
    {
      id: '4',
      type: 'roommate',
      title: 'New Roommate Added',
      description: 'Ananya Patel joined as a new roommate',
      date: '2024-01-10',
      status: 'completed',
      involvedUsers: ['Ananya Patel', 'Arjun Sharma']
    },
    {
      id: '5',
      type: 'expense',
      title: 'Internet Bill',
      description: 'Monthly internet bill split',
      amount: 1675,
      date: '2024-01-08',
      status: 'completed',
      involvedUsers: ['Arjun Sharma', 'Priya Sharma', 'Rahul Gupta', 'Ananya Patel']
    },
    {
      id: '6',
      type: 'message',
      title: 'Group Chat Created',
      description: 'House Group chat was created',
      date: '2024-01-05',
      status: 'completed',
      involvedUsers: ['Arjun Sharma', 'Priya Sharma', 'Rahul Gupta']
    },
    {
      id: '7',
      type: 'payment',
      title: 'Rent Payment',
      description: 'Monthly rent payment to landlord',
      amount: 45000,
      date: '2024-01-01',
      status: 'completed',
      involvedUsers: ['Arjun Sharma']
    }
  ];

  const filteredHistory = mockHistory.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    // For simplicity, showing all items regardless of date range
    return matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expense': return DollarSign;
      case 'payment': return DollarSign;
      case 'chore': return CheckSquare;
      case 'roommate': return Users;
      case 'message': return MessageCircle;
      default: return HistoryIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'expense': return 'bg-blue-100 text-blue-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'chore': return 'bg-purple-100 text-purple-800';
      case 'roommate': return 'bg-orange-100 text-orange-800';
      case 'message': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportHistory = () => {
    console.log('Exporting history data...');
  };

  const totalTransactions = mockHistory.length;
  const completedTransactions = mockHistory.filter(item => item.status === 'completed').length;
  const totalAmount = mockHistory
    .filter(item => item.amount)
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">History</h1>
          <p className="text-gray-600">View your complete activity history and transactions.</p>
        </div>
        <button
          onClick={handleExportHistory}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{totalTransactions}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Activities</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{completedTransactions}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Completed</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">₹{totalAmount.toLocaleString()}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Amount</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Activity Type:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'expense' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setFilter('payment')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setFilter('chore')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'chore' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chores
          </button>
          <button
            onClick={() => setFilter('roommate')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'roommate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Roommates
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Time Period:</span>
          <button
            onClick={() => setDateRange('week')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              dateRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setDateRange('month')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              dateRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setDateRange('quarter')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              dateRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Quarter
          </button>
          <button
            onClick={() => setDateRange('year')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              dateRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Year
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Activity History</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredHistory.map((item) => {
            const Icon = getTypeIcon(item.type);
            
            return (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-semibold text-gray-900">{item.title}</h4>
                        {item.amount && (
                          <span className="text-lg font-bold text-gray-900">₹{item.amount.toLocaleString()}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {item.involvedUsers.length} participant{item.involvedUsers.length > 1 ? 's' : ''}
                          </span>
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;