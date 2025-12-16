import React, { useState } from 'react';
import { Bell, Plus, Calendar, Clock, User, AlertCircle, CheckCircle, X, CreditCard as Edit3 } from 'lucide-react';
import { User as UserType } from '../App';

interface ReminderProps {
  user: UserType;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'payment' | 'chore' | 'meeting' | 'general';
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'snoozed';
  assignedTo?: string;
  recurring: boolean;
  recurringType?: 'daily' | 'weekly' | 'monthly';
}

const Reminder: React.FC<ReminderProps> = ({ user }) => {
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'snoozed'>('all');
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    type: 'general' as const,
    dueDate: '',
    dueTime: '',
    priority: 'medium' as const,
    assignedTo: user.id,
    recurring: false,
    recurringType: 'weekly' as const
  });

  const initialReminders: Reminder[] = [
    {
      id: '1',
      title: 'Pay Electricity Bill',
      description: 'Monthly electricity bill payment due',
      type: 'payment',
      dueDate: '2024-01-20',
      dueTime: '18:00',
      priority: 'high',
      status: 'active',
      assignedTo: user.id,
      recurring: true,
      recurringType: 'monthly'
    },
    {
      id: '2',
      title: 'House Meeting',
      description: 'Monthly house meeting to discuss expenses and chores',
      type: 'meeting',
      dueDate: '2024-01-25',
      dueTime: '19:00',
      priority: 'medium',
      status: 'active',
      recurring: true,
      recurringType: 'monthly'
    },
    {
      id: '3',
      title: 'Clean Kitchen',
      description: 'Weekly kitchen deep cleaning',
      type: 'chore',
      dueDate: '2024-01-18',
      dueTime: '10:00',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Priya Sharma',
      recurring: true,
      recurringType: 'weekly'
    },
    {
      id: '4',
      title: 'Grocery Shopping',
      description: 'Buy weekly groceries and household items',
      type: 'chore',
      dueDate: '2024-01-19',
      dueTime: '16:00',
      priority: 'low',
      status: 'active',
      assignedTo: 'Rahul Gupta',
      recurring: true,
      recurringType: 'weekly'
    },
    {
      id: '5',
      title: 'Internet Bill Reminder',
      description: 'Internet bill payment reminder',
      type: 'payment',
      dueDate: '2024-01-15',
      dueTime: '12:00',
      priority: 'high',
      status: 'snoozed',
      assignedTo: 'Ananya Patel',
      recurring: false
    }
  ];

  // Initialize reminders on component mount
  React.useEffect(() => {
    setReminders(initialReminders);
  }, []);

  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'all') return true;
    return reminder.status === filter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'bg-green-100 text-green-800';
      case 'chore': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'snoozed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddReminder = () => {
    const reminderToAdd: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      description: newReminder.description,
      type: newReminder.type,
      dueDate: newReminder.dueDate,
      dueTime: newReminder.dueTime,
      priority: newReminder.priority,
      status: 'active',
      assignedTo: newReminder.assignedTo,
      recurring: newReminder.recurring,
      recurringType: newReminder.recurring ? newReminder.recurringType : undefined
    };
    
    setReminders(prevReminders => [reminderToAdd, ...prevReminders]);
    setNewReminder({
      title: '',
      description: '',
      type: 'general',
      dueDate: '',
      dueTime: '',
      priority: 'medium',
      assignedTo: user.id,
      recurring: false,
      recurringType: 'weekly'
    });
    setShowAddReminder(false);
  };

  const handleCompleteReminder = (reminderId: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, status: 'completed' as const }
          : reminder
      )
    );
  };

  const handleSnoozeReminder = (reminderId: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, status: 'snoozed' as const }
          : reminder
      )
    );
  };

  const activeCount = reminders.filter(r => r.status === 'active').length;
  const completedCount = reminders.filter(r => r.status === 'completed').length;
  const snoozedCount = reminders.filter(r => r.status === 'snoozed').length;

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reminders</h1>
          <p className="text-gray-600">Stay on top of your tasks and important dates.</p>
        </div>
        <button
          onClick={() => setShowAddReminder(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Reminder
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{activeCount}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Active</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{completedCount}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Completed</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">{snoozedCount}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Snoozed</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{reminders.length}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Reminders
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('snoozed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'snoozed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Snoozed
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            {filter === 'all' ? 'All Reminders' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Reminders`}
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredReminders.map((reminder) => (
            <div key={reminder.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-semibold text-gray-900">{reminder.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(reminder.type)}`}>
                      {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                      {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                      {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{reminder.description}</p>
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(reminder.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{reminder.dueTime}</span>
                    </div>
                    {reminder.assignedTo && (
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{reminder.assignedTo}</span>
                      </div>
                    )}
                    {reminder.recurring && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Recurring {reminder.recurringType}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  {reminder.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleCompleteReminder(reminder.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors duration-200"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleSnoozeReminder(reminder.id)}
                        className="px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 transition-colors duration-200"
                      >
                        Snooze
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedReminder(reminder)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors duration-200"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Reminder</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reminder title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Describe the reminder..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newReminder.type}
                      onChange={(e) => setNewReminder({...newReminder, type: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="payment">Payment</option>
                      <option value="chore">Chore</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newReminder.priority}
                      onChange={(e) => setNewReminder({...newReminder, priority: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newReminder.dueDate}
                      onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
                    <input
                      type="time"
                      value={newReminder.dueTime}
                      onChange={(e) => setNewReminder({...newReminder, dueTime: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newReminder.recurring}
                      onChange={(e) => setNewReminder({...newReminder, recurring: e.target.checked})}
                      className="mr-3 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Recurring Reminder</span>
                  </label>
                </div>

                {newReminder.recurring && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Repeat</label>
                    <select
                      value={newReminder.recurringType}
                      onChange={(e) => setNewReminder({...newReminder, recurringType: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddReminder(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReminder}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Detail Modal */}
      {selectedReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">Reminder Details</h3>
                <button
                  onClick={() => setSelectedReminder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{selectedReminder.title}</h4>
                  <p className="text-gray-600 mt-1">{selectedReminder.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <p className="font-medium mt-1">{new Date(selectedReminder.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Time:</span>
                    <p className="font-medium mt-1">{selectedReminder.dueTime}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(selectedReminder.type)}`}>
                    {selectedReminder.type.charAt(0).toUpperCase() + selectedReminder.type.slice(1)}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(selectedReminder.priority)}`}>
                    {selectedReminder.priority.charAt(0).toUpperCase() + selectedReminder.priority.slice(1)} Priority
                  </span>
                </div>

                <div className="text-center">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedReminder.status)}`}>
                    {selectedReminder.status.charAt(0).toUpperCase() + selectedReminder.status.slice(1)}
                  </span>
                </div>

                {selectedReminder.recurring && (
                  <div className="text-center">
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      Recurring {selectedReminder.recurringType}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedReminder(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                {selectedReminder.status === 'active' && (
                  <button
                    onClick={() => handleCompleteReminder(selectedReminder.id)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Complete
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

export default Reminder;