import React, { useState } from 'react';
import { Clock, CheckSquare, AlertCircle, Calendar, User, Filter } from 'lucide-react';
import { User as UserType } from '../App';

interface PendingTasksProps {
  user: UserType;
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'chore' | 'payment' | 'approval' | 'reminder';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedBy?: string;
  status: 'pending' | 'overdue';
}

const PendingTasks: React.FC<PendingTasksProps> = ({ user }) => {
  const [filter, setFilter] = useState<'all' | 'chore' | 'payment' | 'approval' | 'reminder'>('all');

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Pay Electricity Bill',
      description: 'Your share of the electricity bill is due',
      type: 'payment',
      priority: 'high',
      dueDate: '2024-01-20',
      assignedBy: 'Priya Sharma',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Clean Kitchen',
      description: 'Weekly kitchen cleaning assigned to you',
      type: 'chore',
      priority: 'medium',
      dueDate: '2024-01-18',
      assignedBy: 'System',
      status: 'overdue'
    },
    {
      id: '3',
      title: 'Approve New Roommate',
      description: 'Review and approve Vikram Singh as new roommate',
      type: 'approval',
      priority: 'medium',
      dueDate: '2024-01-22',
      assignedBy: 'Rahul Gupta',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Grocery Shopping',
      description: 'Buy weekly groceries for the house',
      type: 'chore',
      priority: 'low',
      dueDate: '2024-01-19',
      assignedBy: 'Ananya Patel',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Internet Bill Reminder',
      description: 'Internet bill payment is due in 2 days',
      type: 'reminder',
      priority: 'medium',
      dueDate: '2024-01-17',
      assignedBy: 'System',
      status: 'overdue'
    }
  ];

  const filteredTasks = filter === 'all' ? mockTasks : mockTasks.filter(task => task.type === filter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'chore': return 'bg-blue-100 text-blue-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'approval': return 'bg-purple-100 text-purple-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
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
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Completing task:', taskId);
  };

  const pendingCount = mockTasks.filter(task => task.status === 'pending').length;
  const overdueCount = mockTasks.filter(task => task.status === 'overdue').length;

  return (
    <div className="max-w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pending Tasks</h1>
        <p className="text-gray-600">Keep track of your pending chores, payments, and approvals.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">{pendingCount}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Pending Tasks</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-red-600">{overdueCount}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Overdue Tasks</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{mockTasks.length}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('chore')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'chore' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chores
          </button>
          <button
            onClick={() => setFilter('payment')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setFilter('approval')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'approval' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approvals
          </button>
          <button
            onClick={() => setFilter('reminder')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === 'reminder' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reminders
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            {filter === 'all' ? 'All Tasks' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-semibold text-gray-900">{task.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(task.type)}`}>
                      {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className={task.status === 'overdue' ? 'text-red-600 font-semibold' : ''}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>Assigned by: {task.assignedBy}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;