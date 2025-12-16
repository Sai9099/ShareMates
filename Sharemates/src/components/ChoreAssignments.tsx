import React, { useState } from 'react';
import { Plus, CheckSquare, Clock, User, Calendar, RotateCcw, Check, X } from 'lucide-react';
import { User as UserType } from '../App';

interface ChoreAssignmentsProps {
  user: UserType;
}

interface Chore {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  category: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  priority: 'low' | 'medium' | 'high';
  completedDate?: string;
}

interface Roommate {
  id: string;
  name: string;
  avatar: string;
}

const ChoreAssignments: React.FC<ChoreAssignmentsProps> = ({ user }) => {
  const [showAddChore, setShowAddChore] = useState(false);
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null);
  const [chores, setChores] = useState<Chore[]>([]);
  const [newChore, setNewChore] = useState({
    title: '',
    description: '',
    assignedTo: user.id,
    dueDate: '',
    category: 'cleaning',
    frequency: 'weekly' as const,
    priority: 'medium' as const
  });

  const roommates: Roommate[] = [
    { id: user.id, name: 'Arjun Sharma', avatar: user.avatar || '' },
    { id: '2', name: 'Priya Sharma', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '3', name: 'Rahul Gupta', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: '4', name: 'Ananya Patel', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
  ];

  const initialChores: Chore[] = [
    {
      id: '1',
      title: 'Kitchen Cleaning',
      description: 'Clean countertops, wash dishes, and mop the floor',
      assignedTo: user.id,
      dueDate: '2024-01-20',
      status: 'pending',
      category: 'cleaning',
      frequency: 'weekly',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Grocery Shopping',
      description: 'Buy vegetables, fruits, and household essentials',
      assignedTo: '2',
      dueDate: '2024-01-18',
      status: 'in-progress',
      category: 'shopping',
      frequency: 'weekly',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Bathroom Cleaning',
      description: 'Clean toilet, shower, and bathroom floor',
      assignedTo: '3',
      dueDate: '2024-01-15',
      status: 'completed',
      category: 'cleaning',
      frequency: 'weekly',
      priority: 'high',
      completedDate: '2024-01-15'
    },
    {
      id: '4',
      title: 'Trash Collection',
      description: 'Collect trash from all rooms and take to disposal area',
      assignedTo: '4',
      dueDate: '2024-01-12',
      status: 'overdue',
      category: 'maintenance',
      frequency: 'weekly',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Living Room Cleaning',
      description: 'Vacuum carpet, dust furniture, and organize items',
      assignedTo: '2',
      dueDate: '2024-01-22',
      status: 'pending',
      category: 'cleaning',
      frequency: 'weekly',
      priority: 'low'
    },
    {
      id: '6',
      title: 'Laundry',
      description: 'Wash and fold shared towels and cleaning cloths',
      assignedTo: '3',
      dueDate: '2024-01-19',
      status: 'pending',
      category: 'laundry',
      frequency: 'weekly',
      priority: 'medium'
    }
  ];

  // Initialize chores on component mount
  React.useEffect(() => {
    setChores(initialChores);
  }, []);

  const categories = [
    { id: 'cleaning', name: 'Cleaning', color: 'bg-blue-500' },
    { id: 'shopping', name: 'Shopping', color: 'bg-green-500' },
    { id: 'maintenance', name: 'Maintenance', color: 'bg-orange-500' },
    { id: 'laundry', name: 'Laundry', color: 'bg-purple-500' },
    { id: 'cooking', name: 'Cooking', color: 'bg-red-500' },
    { id: 'other', name: 'Other', color: 'bg-gray-500' }
  ];

  const getRoommateName = (id: string) => {
    const roommate = roommates.find(r => r.id === id);
    return roommate ? roommate.name : 'Unknown';
  };

  const getRoommateAvatar = (id: string) => {
    const roommate = roommates.find(r => r.id === id);
    return roommate ? roommate.avatar : '';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
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

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[categories.length - 1];
  };

  const handleAddChore = () => {
    const choreToAdd: Chore = {
      id: Date.now().toString(),
      title: newChore.title,
      description: newChore.description,
      assignedTo: newChore.assignedTo,
      dueDate: newChore.dueDate,
      status: 'pending',
      category: newChore.category,
      frequency: newChore.frequency,
      priority: newChore.priority
    };
    
    setChores(prevChores => [choreToAdd, ...prevChores]);
    setNewChore({
      title: '',
      description: '',
      assignedTo: user.id,
      dueDate: '',
      category: 'cleaning',
      frequency: 'weekly',
      priority: 'medium'
    });
    setShowAddChore(false);
  };

  const handleCompleteChore = (choreId: string) => {
    setChores(prevChores => 
      prevChores.map(chore => 
        chore.id === choreId 
          ? { ...chore, status: 'completed' as const, completedDate: new Date().toISOString().split('T')[0] }
          : chore
      )
    );
  };

  const handleReassignChore = (choreId: string) => {
    console.log('Reassigning chore:', choreId);
  };

  const myChores = chores.filter(chore => chore.assignedTo === user.id);
  const completedChores = chores.filter(chore => chore.status === 'completed').length;
  const pendingChores = chores.filter(chore => chore.status === 'pending' || chore.status === 'in-progress').length;
  const overdueChores = chores.filter(chore => chore.status === 'overdue').length;

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chore Assignments</h1>
          <p className="text-gray-600">Manage and track household chores among roommates.</p>
        </div>
        <button
          onClick={() => setShowAddChore(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Chore
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-lg font-bold text-blue-600">{myChores.length}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">My Chores</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-lg font-bold text-green-600">{completedChores}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Completed</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-lg font-bold text-yellow-600">{pendingChores}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Pending</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-lg font-bold text-red-600">{overdueChores}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Overdue</p>
        </div>
      </div>

      {/* Chores List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">All Chores</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {chores.map((chore) => {
            const categoryInfo = getCategoryInfo(chore.category);
            const isOverdue = new Date(chore.dueDate) < new Date() && chore.status !== 'completed';
            
            return (
              <div key={chore.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-10 h-10 rounded-lg ${categoryInfo.color} flex items-center justify-center mr-3`}>
                      <CheckSquare className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-semibold text-gray-900">{chore.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(chore.priority)}`}>
                            {chore.priority.charAt(0).toUpperCase() + chore.priority.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chore.status)}`}>
                            {chore.status.charAt(0).toUpperCase() + chore.status.slice(1).replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{chore.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <img
                            src={getRoommateAvatar(chore.assignedTo)}
                            alt={getRoommateName(chore.assignedTo)}
                            className="w-5 h-5 rounded-full mr-2"
                          />
                          <span>Assigned to {getRoommateName(chore.assignedTo)}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
                            Due {new Date(chore.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {chore.assignedTo === user.id && chore.status !== 'completed' && (
                            <button
                              onClick={() => handleCompleteChore(chore.id)}
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors duration-200"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedChore(chore)}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors duration-200"
                          >
                            View
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

      {/* Add Chore Modal */}
      {showAddChore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Chore</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newChore.title}
                    onChange={(e) => setNewChore({...newChore, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Enter chore title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newChore.description}
                    onChange={(e) => setNewChore({...newChore, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="Describe the chore..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                  <select
                    value={newChore.assignedTo}
                    onChange={(e) => setNewChore({...newChore, assignedTo: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {roommates.map((roommate) => (
                      <option key={roommate.id} value={roommate.id}>{roommate.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newChore.dueDate}
                    onChange={(e) => setNewChore({...newChore, dueDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newChore.category}
                      onChange={(e) => setNewChore({...newChore, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newChore.priority}
                      onChange={(e) => setNewChore({...newChore, priority: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    value={newChore.frequency}
                    onChange={(e) => setNewChore({...newChore, frequency: e.target.value as 'once' | 'daily' | 'weekly' | 'monthly'})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="once">One Time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddChore(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddChore}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Add Chore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chore Detail Modal */}
      {selectedChore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">Chore Details</h3>
                <button
                  onClick={() => setSelectedChore(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{selectedChore.title}</h4>
                  <p className="text-gray-600 mt-1">{selectedChore.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Assigned to:</span>
                    <div className="flex items-center mt-1">
                      <img
                        src={getRoommateAvatar(selectedChore.assignedTo)}
                        alt={getRoommateName(selectedChore.assignedTo)}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="font-medium">{getRoommateName(selectedChore.assignedTo)}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <p className="font-medium mt-1">{new Date(selectedChore.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <p className="font-medium mt-1">{getCategoryInfo(selectedChore.category).name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Frequency:</span>
                    <p className="font-medium mt-1">{selectedChore.frequency.charAt(0).toUpperCase() + selectedChore.frequency.slice(1)}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(selectedChore.priority)}`}>
                    {selectedChore.priority.charAt(0).toUpperCase() + selectedChore.priority.slice(1)} Priority
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedChore.status)}`}>
                    {selectedChore.status.charAt(0).toUpperCase() + selectedChore.status.slice(1).replace('-', ' ')}
                  </span>
                </div>

                {selectedChore.completedDate && (
                  <div className="text-center">
                    <span className="text-gray-500 text-sm">Completed on:</span>
                    <p className="font-medium text-green-600">{new Date(selectedChore.completedDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedChore(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                {selectedChore.status !== 'completed' && (
                  <>
                    <button
                      onClick={() => handleReassignChore(selectedChore.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Reassign
                    </button>
                    {selectedChore.assignedTo === user.id && (
                      <button
                        onClick={() => handleCompleteChore(selectedChore.id)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Complete
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoreAssignments;