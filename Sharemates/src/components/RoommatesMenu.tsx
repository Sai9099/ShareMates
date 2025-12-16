import React, { useState } from 'react';
import { Users, MessageCircle, Phone, Mail, MoreVertical, UserPlus, UserMinus, Star } from 'lucide-react';
import { User as UserType } from '../App';

interface RoommatesMenuProps {
  user: UserType;
}

interface Roommate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  status: 'active' | 'pending' | 'inactive';
  rating: number;
  isOnline: boolean;
}

const RoommatesMenu: React.FC<RoommatesMenuProps> = ({ user }) => {
  const [showAddRoommate, setShowAddRoommate] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState<Roommate | null>(null);

  const mockRoommates: Roommate[] = [
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      joinDate: '2024-01-01',
      status: 'active',
      rating: 4.8,
      isOnline: true
    },
    {
      id: '3',
      name: 'Rahul Gupta',
      email: 'rahul.gupta@email.com',
      phone: '+91 87654 32109',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      joinDate: '2023-12-15',
      status: 'active',
      rating: 4.6,
      isOnline: false
    },
    {
      id: '4',
      name: 'Ananya Patel',
      email: 'ananya.patel@email.com',
      phone: '+91 76543 21098',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      joinDate: '2024-01-10',
      status: 'pending',
      rating: 4.9,
      isOnline: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMessage = (roommateId: string) => {
    console.log('Messaging roommate:', roommateId);
  };

  const handleCall = (roommateId: string) => {
    console.log('Calling roommate:', roommateId);
  };

  const handleRemoveRoommate = (roommateId: string) => {
    console.log('Removing roommate:', roommateId);
  };

  const activeRoommates = mockRoommates.filter(r => r.status === 'active').length;
  const pendingRoommates = mockRoommates.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Roommates</h1>
          <p className="text-gray-600">Manage your current roommates and connections.</p>
        </div>
        <button
          onClick={() => setShowAddRoommate(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Roommate
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{activeRoommates}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Active Roommates</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">{pendingRoommates}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Pending Approvals</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{mockRoommates.length + 1}</span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Members</p>
        </div>
      </div>

      {/* Current User Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">You</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-semibold text-gray-900">{user.name}</h4>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roommates List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Roommates</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {mockRoommates.map((roommate) => (
            <div key={roommate.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={roommate.avatar}
                      alt={roommate.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {roommate.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-semibold text-gray-900">{roommate.name}</h4>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-600 ml-1">{roommate.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{roommate.email}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(roommate.status)}`}>
                        {roommate.status.charAt(0).toUpperCase() + roommate.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Joined {new Date(roommate.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMessage(roommate.id)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="Message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCall(roommate.id)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedRoommate(roommate)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Roommate Modal */}
      {showAddRoommate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Roommate</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter roommate's email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Add a personal message..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddRoommate(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddRoommate(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Roommate Options Modal */}
      {selectedRoommate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={selectedRoommate.avatar}
                  alt={selectedRoommate.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedRoommate.name}</h3>
                  <p className="text-gray-600">{selectedRoommate.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  View Profile
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  Send Message
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  View Shared Expenses
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  Assign Chore
                </button>
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={() => handleRemoveRoommate(selectedRoommate.id)}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Remove Roommate
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedRoommate(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoommatesMenu;