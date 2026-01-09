import React, { useState } from 'react';
import { Receipt, Calendar, DollarSign, CheckCircle, Filter, Download, Search } from 'lucide-react';
import { User as UserType } from '../App';

interface BillsPaidProps {
  user: UserType;
}

interface Payment {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  paidTo: string;
  category: string;
  date: string;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  receipt?: string;
}

const BillsPaid: React.FC<BillsPaidProps> = ({ user }) => {
  const [filter, setFilter] = useState<'all' | 'utilities' | 'rent' | 'groceries' | 'other'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockPayments: Payment[] = [
    {
      id: '1',
      title: 'Electricity Bill - January',
      amount: 2850,
      paidBy: user.name,
      paidTo: 'MSEB',
      category: 'utilities',
      date: '2024-01-15',
      method: 'UPI',
      status: 'completed',
      receipt: 'receipt_001.pdf'
    },
    {
      id: '2',
      title: 'Internet Bill - January',
      amount: 1675,
      paidBy: 'Priya Sharma',
      paidTo: 'Airtel',
      category: 'utilities',
      date: '2024-01-12',
      method: 'Credit Card',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Monthly Rent',
      amount: 45000,
      paidBy: user.name,
      paidTo: 'Landlord',
      category: 'rent',
      date: '2024-01-01',
      method: 'Bank Transfer',
      status: 'completed',
      receipt: 'rent_receipt_jan.pdf'
    },
    {
      id: '4',
      title: 'Grocery Shopping - Week 2',
      amount: 3240,
      paidBy: 'Rahul Gupta',
      paidTo: 'Big Bazaar',
      category: 'groceries',
      date: '2024-01-10',
      method: 'Debit Card',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Gas Cylinder',
      amount: 850,
      paidBy: 'Ananya Patel',
      paidTo: 'HP Gas',
      category: 'utilities',
      date: '2024-01-08',
      method: 'Cash',
      status: 'completed'
    },
    {
      id: '6',
      title: 'Water Bill - January',
      amount: 420,
      paidBy: user.name,
      paidTo: 'Municipal Corporation',
      category: 'utilities',
      date: '2024-01-05',
      method: 'UPI',
      status: 'completed'
    }
  ];

  const filteredPayments = mockPayments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.category === filter;
    const matchesSearch = payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.paidTo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'utilities': return 'bg-blue-100 text-blue-800';
      case 'rent': return 'bg-red-100 text-red-800';
      case 'groceries': return 'bg-green-100 text-green-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadReceipt = (paymentId: string) => {
    console.log('Downloading receipt for payment:', paymentId);
  };

  const totalPaid = mockPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const myPayments = mockPayments.filter(payment => payment.paidBy === user.name);
  const myTotalPaid = myPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="max-w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bills Paid</h1>
        <p className="text-gray-600">Track all your completed payments and download receipts.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Paid</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">₹{myTotalPaid.toLocaleString()}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">My Payments</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{mockPayments.length}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Bills</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setFilter('utilities')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'utilities' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Utilities
          </button>
          <button
            onClick={() => setFilter('rent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'rent' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rent
          </button>
          <button
            onClick={() => setFilter('groceries')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'groceries' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Groceries
          </button>
          <button
            onClick={() => setFilter('other')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'other' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Other
          </button>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Receipt className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-semibold text-gray-900">{payment.title}</h4>
                      <span className="text-lg font-bold text-gray-900">₹{payment.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span>Paid by {payment.paidBy}</span>
                      <span className="mx-2">•</span>
                      <span>To {payment.paidTo}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(payment.category)}`}>
                          {payment.category.charAt(0).toUpperCase() + payment.category.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">via {payment.method}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {payment.receipt && (
                          <button
                            onClick={() => handleDownloadReceipt(payment.id)}
                            className="flex items-center px-3 py-1 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-sm"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillsPaid;