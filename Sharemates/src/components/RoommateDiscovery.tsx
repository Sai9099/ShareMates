import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Heart, X, MessageCircle, User } from 'lucide-react';
import { User as UserType } from '../App';

interface RoommateDiscoveryProps {
  user: UserType;
}

interface Roommate {
  id: string;
  name: string;
  age: number;
  location: string;
  budget: string;
  bio: string;
  interests: string[];
  rating: number;
  avatar: string;
  isOnline: boolean;
  compatibility: number;
}

const RoommateDiscovery: React.FC<RoommateDiscoveryProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState<Roommate | null>(null);

  const mockRoommates: Roommate[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      age: 24,
      location: 'Connaught Place',
      budget: '₹60,000-90,000',
      bio: 'Clean, organized, and love cooking! Looking for someone who enjoys a peaceful living environment.',
      interests: ['Cooking', 'Yoga', 'Reading', 'Plants'],
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      isOnline: true,
      compatibility: 92
    },
    {
      id: '2',
      name: 'Rahul Gupta',
      age: 27,
      location: 'Koramangala',
      budget: '₹45,000-67,500',
      bio: 'Software developer, quiet but friendly. Work from home so need good internet and a dedicated workspace.',
      interests: ['Gaming', 'Tech', 'Coffee', 'Basketball'],
      rating: 4.6,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      isOnline: false,
      compatibility: 85
    },
    {
      id: '3',
      name: 'Ananya Patel',
      age: 22,
      location: 'Bandra West',
      budget: '₹52,500-75,000',
      bio: 'Art student who loves creative spaces. I\'m respectful, clean, and enjoy weekend movie nights.',
      interests: ['Art', 'Movies', 'Music', 'Photography'],
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      isOnline: true,
      compatibility: 88
    },
    {
      id: '4',
      name: 'Vikram Singh',
      age: 26,
      location: 'Gurgaon Sector 29',
      budget: '₹67,500-97,500',
      bio: 'Marketing professional, social but respect personal space. Love hosting small gatherings on weekends.',
      interests: ['Fitness', 'Travel', 'Cooking', 'Networking'],
      rating: 4.7,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      isOnline: true,
      compatibility: 90
    }
  ];

  const handleLike = (roommateId: string) => {
    console.log('Liked roommate:', roommateId);
  };

  const handlePass = (roommateId: string) => {
    console.log('Passed roommate:', roommateId);
  };

  return (
    <div className="max-w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Roommate</h1>
        <p className="text-gray-600">Discover compatible people to share your living space with.</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location, interests, or budget..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option>All Budgets</option>
                <option>₹37,500-60,000</option>
                <option>₹60,000-90,000</option>
                <option>₹90,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option>All Locations</option>
                <option>Connaught Place</option>
                <option>Koramangala</option>
                <option>Bandra West</option>
                <option>Gurgaon Sector 29</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option>Any Age</option>
                <option>18-25</option>
                <option>25-30</option>
                <option>30+</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Roommate Cards */}
      <div className="space-y-4">
        {mockRoommates.map((roommate) => (
          <div key={roommate.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header with Avatar and Online Status */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
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
                  <div className="ml-3">
                    <h3 className="text-lg font-bold text-gray-900">{roommate.name}</h3>
                    <p className="text-gray-600">{roommate.age} years old</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-sm font-semibold">{roommate.rating}</span>
                  </div>
                  <div className="text-xs text-purple-600 font-semibold">
                    {roommate.compatibility}% match
                  </div>
                </div>
              </div>

              {/* Location and Budget */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {roommate.location}
                </div>
                <div className="font-semibold text-green-600">
                  {roommate.budget}
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {roommate.bio}
              </p>

              {/* Interests */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {roommate.interests.slice(0, 3).map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  {roommate.interests.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{roommate.interests.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handlePass(roommate.id)}
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Pass
                </button>
                <button
                  onClick={() => setSelectedRoommate(roommate)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  View
                </button>
                <button
                  onClick={() => handleLike(roommate.id)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedRoommate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Roommate Profile</h2>
                <button
                  onClick={() => setSelectedRoommate(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center mb-6">
                <div className="relative">
                  <img
                    src={selectedRoommate.avatar}
                    alt={selectedRoommate.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {selectedRoommate.isOnline && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedRoommate.name}</h3>
                  <p className="text-gray-600 text-lg">{selectedRoommate.age} years old</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span className="font-semibold">{selectedRoommate.rating}</span>
                    <span className="text-purple-600 font-semibold ml-4">
                      {selectedRoommate.compatibility}% compatibility
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-700">{selectedRoommate.bio}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedRoommate.location}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Budget</h4>
                    <p className="text-green-600 font-semibold">{selectedRoommate.budget}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoommate.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleLike(selectedRoommate.id)}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Send Connection Request
                  </button>
                  <button className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start Conversation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoommateDiscovery;