import React, { useState } from 'react';
import { Plus, DollarSign, Users, Calendar, Receipt, Eye, Trash2, CreditCard as Edit3 } from 'lucide-react';
import { User as UserType } from '../App';

interface ExpenseSharingProps {
  user: UserType;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  category: string;
  date: string;
  status: 'pending' | 'settled' | 'partial';
  description?: string;
}

interface Roommate {
  id: string;
  name: string;
  avatar: string;
}

const ExpenseSharing: React.FC<ExpenseSharingProps> = ({ user }) => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'utilities',
    description: '',
    splitBetween: [user.id]
  });

  const roommates: Roommate[] = [
    { id: user.id, name: 'Arjun Sharma', avatar: user.avatar || '' },
    { id: '2', name: 'Priya Sharma', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '3', name: 'Rahul Gupta', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '4', name: 'Ananya Patel', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
  ];

  const mockExpenses: Expense[] = [
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 10800,
      paidBy: user.id,
      splitBetween: ['1', '2', '3'],
      category: 'groceries',
      date: '2024-01-15',
      status: 'pending',
      description: 'Weekly grocery shopping at Big Bazaar'
    },
    {
      id: '2',
      title: 'Internet Bill',
      amount: 6700,
      paidBy: '2',
      splitBetween: ['1', '2', '3', '4'],
      category: 'utilities',
      date: '2024-01-10',
      status: 'settled'
    },
    {
      id: '3',
      title: 'Cleaning Supplies',
      amount: 3360,
      paidBy: '3',
      splitBetween: ['1', '2', '3', '4'],
      category: 'household',
      date: '2024-01-08',
      status: 'partial'
    },
    {
      id: '4',
      title: 'Electric Bill',
      amount: 11650,
      paidBy: '4',
      splitBetween: ['1', '2', '3', '4'],
      category: 'utilities',
      date: '2024-01-05',
      status: 'settled'
    }
  ];

  const categories = [
    { id: 'utilities', name: 'Utilities', color: 'bg-blue-500' },
    { id: 'groceries', name: 'Groceries', color: 'bg-green-500' },
    { id: 'household', name: 'Household', color: 'bg-purple-500' },
    { id: 'rent', name: 'Rent', color: 'bg-red-500' },
    { id: 'entertainment', name: 'Entertainment', color: 'bg-yellow-500' },
    { id: 'other', name: 'Other', color: 'bg-gray-500' }
  ];

  const getRoommateName = (id: string) => {
    const roommate = roommates.find(r => r.id === id);
    return roommate ? roommate.name : 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[categories.length - 1];
  };

  const calculateSplit = (expense: Expense) => {
    return expense.amount / expense.splitBetween.length;
  };

  const handleAddExpense = () => {
    console.log('Adding expense:', newExpense);
    setNewExpense({
      title: '',
      amount: '',
      category: 'utilities',
      description: '',
      splitBetween: [user.id]
    });
    setShowAddExpense(false);
  };

  const totalOwed = mockExpenses
    .filter(expense => expense.paidBy !== user.id && expense.splitBetween.includes(user.id) && expense.status !== 'settled')
    .reduce((sum, expense) => sum + calculateSplit(expense), 0);

  const totalOwedToYou = mockExpenses
    .filter(expense => expense.paidBy === user.id && expense.status !== 'settled')
    .reduce((sum, expense) => sum + (expense.amount - calculateSplit(expense)), 0);

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Expense Sharing</h1>
          <p className="text-gray-600">Track and split shared expenses with your roommates.</p>
        </div>
        <button
          onClick={() => setShowAddExpense(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-lg font-bold text-red-600">₹{totalOwed.toFixed(0)}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">You Owe</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-lg font-bold text-green-600">₹{totalOwedToYou.toFixed(0)}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Owed to You</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-lg font-bold text-gray-900">{mockExpenses.length}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Recent Expenses</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {mockExpenses.map((expense) => {
            const categoryInfo = getCategoryInfo(expense.category);
            const splitAmount = calculateSplit(expense);
            
            return (
              <div key={expense.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-10 h-10 rounded-lg ${categoryInfo.color} flex items-center justify-center mr-3`}>
                      <Receipt className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base font-semibold text-gray-900">{expense.title}</h4>
                        <span className="text-lg font-bold text-gray-900">₹{expense.amount.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>Paid by {getRoommateName(expense.paidBy)}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{categoryInfo.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            Split {expense.splitBetween.length} ways (₹{splitAmount.toFixed(0)} each)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(expense.status)}`}>
                            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                          </span>
                          <button
                            onClick={() => setSelectedExpense(expense)}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
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

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Expense</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter expense title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Split Between</label>
                  <div className="space-y-2">
                    {roommates.map((roommate) => (
                      <label key={roommate.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newExpense.splitBetween.includes(roommate.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewExpense({
                                ...newExpense,
                                splitBetween: [...newExpense.splitBetween, roommate.id]
                              });
                            } else {
                              setNewExpense({
                                ...newExpense,
                                splitBetween: newExpense.splitBetween.filter(id => id !== roommate.id)
                              });
                            }
                          }}
                          className="mr-3 rounded"
                        />
                        <img src={roommate.avatar} alt={roommate.name} className="w-6 h-6 rounded-full mr-2" />
                        <span className="text-sm text-gray-700">{roommate.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Add a description..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExpense}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">Expense Details</h3>
                <button
                  onClick={() => setSelectedExpense(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedExpense.title}</h4>
                  <p className="text-2xl font-bold text-purple-600">₹{selectedExpense.amount.toFixed(0)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Paid by:</span>
                    <p className="font-medium">{getRoommateName(selectedExpense.paidBy)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <p className="font-medium">{new Date(selectedExpense.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 text-sm">Split between:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedExpense.splitBetween.map((id) => (
                      <div key={id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <span className="text-sm font-medium">{getRoommateName(id)}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ₹{calculateSplit(selectedExpense).toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedExpense.description && (
                  <div>
                    <span className="text-gray-500 text-sm">Description:</span>
                    <p className="text-gray-700">{selectedExpense.description}</p>
                  </div>
                )}

                <div className="flex justify-center">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedExpense.status)}`}>
                    {selectedExpense.status.charAt(0).toUpperCase() + selectedExpense.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedExpense(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                {selectedExpense.status !== 'settled' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Mark as Settled
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSharing;