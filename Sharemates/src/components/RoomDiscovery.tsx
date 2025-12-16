import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Heart, X, MessageCircle, Building, Bed, Bath, Car, Wifi, Users, IndianRupee } from 'lucide-react';
import { User as UserType } from '../App';

interface RoomDiscoveryProps {
  user: UserType;
}

interface Room {
  id: string;
  title: string;
  location: string;
  rent: number;
  deposit: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  description: string;
  images: string[];
  rating: number;
  isAvailable: boolean;
  postedBy: string;
  postedDate: string;
  preferences: string[];
}

const RoomDiscovery: React.FC<RoomDiscoveryProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const mockRooms: Room[] = [
    {
      id: '1',
      title: 'Spacious 2BHK in Koramangala',
      location: 'Koramangala 5th Block, Bangalore',
      rent: 45000,
      deposit: 90000,
      type: '2BHK',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      amenities: ['WiFi', 'Parking', 'Gym', 'Security', 'Power Backup'],
      description: 'Beautiful 2BHK apartment with modern amenities. Close to tech parks and metro station. Fully furnished with AC in all rooms.',
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
      rating: 4.8,
      isAvailable: true,
      postedBy: 'Rajesh Kumar',
      postedDate: '2024-01-15',
      preferences: ['Working Professionals', 'Non-Smokers', 'Vegetarians Preferred']
    },
    {
      id: '2',
      title: 'Modern 1BHK in Bandra West',
      location: 'Bandra West, Mumbai',
      rent: 65000,
      deposit: 130000,
      type: '1BHK',
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      amenities: ['WiFi', 'AC', 'Washing Machine', 'Security', 'Elevator'],
      description: 'Newly renovated 1BHK with sea view. Walking distance to Bandra station and shopping areas. Perfect for young professionals.',
      images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
      rating: 4.6,
      isAvailable: true,
      postedBy: 'Priya Mehta',
      postedDate: '2024-01-12',
      preferences: ['Working Professionals', 'No Pets', 'Quiet Tenants']
    },
    {
      id: '3',
      title: 'Shared 3BHK in Connaught Place',
      location: 'Connaught Place, New Delhi',
      rent: 35000,
      deposit: 70000,
      type: '3BHK Shared',
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      amenities: ['WiFi', 'Parking', 'Kitchen', 'Balcony', 'Metro Nearby'],
      description: 'Spacious 3BHK apartment looking for 1 more roommate. Great location in the heart of Delhi with easy access to metro and markets.',
      images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
      rating: 4.7,
      isAvailable: true,
      postedBy: 'Amit Sharma',
      postedDate: '2024-01-10',
      preferences: ['Students/Professionals', 'Vegetarians', 'Clean & Organized']
    },
    {
      id: '4',
      title: 'Luxury 2BHK in Gurgaon',
      location: 'Sector 29, Gurgaon',
      rent: 55000,
      deposit: 110000,
      type: '2BHK',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      amenities: ['WiFi', 'Gym', 'Swimming Pool', 'Security', 'Club House', 'Parking'],
      description: 'Premium apartment in gated community with world-class amenities. Close to Cyber City and major IT companies.',
      images: ['https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'],
      rating: 4.9,
      isAvailable: true,
      postedBy: 'Neha Gupta',
      postedDate: '2024-01-08',
      preferences: ['Working Professionals', 'Non-Smokers', 'Family Friendly']
    }
  ];

  const handleLike = (roomId: string) => {
    console.log('Liked room:', roomId);
  };

  const handleContact = (roomId: string) => {
    console.log('Contacting for room:', roomId);
  };

  return (
    <div className="max-w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Room</h1>
        <p className="text-gray-600">Discover available rooms and properties that match your preferences.</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location, type, or budget..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Budgets</option>
                <option>₹25,000-40,000</option>
                <option>₹40,000-60,000</option>
                <option>₹60,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>1BHK</option>
                <option>2BHK</option>
                <option>3BHK</option>
                <option>Shared Room</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Locations</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Gurgaon</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Room Cards */}
      <div className="space-y-4">
        {mockRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Room Image */}
            <div className="relative h-48">
              <img
                src={room.images[0]}
                alt={room.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg">
                <Heart className="w-5 h-5 text-gray-600" />
              </div>
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {room.isAvailable ? 'Available' : 'Not Available'}
              </div>
            </div>

            {/* Room Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{room.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {room.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-sm font-semibold">{room.rating}</span>
                  </div>
                </div>
              </div>

              {/* Price and Details */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-2xl font-bold text-green-600">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {room.rent.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal ml-1">/month</span>
                </div>
                <div className="text-sm text-gray-600">
                  Deposit: ₹{room.deposit.toLocaleString()}
                </div>
              </div>

              {/* Room Features */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  {room.bedrooms} Bed
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  {room.bathrooms} Bath
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {room.area} sq ft
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {room.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => handleContact(room.id)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Contact Owner
                </button>
                <button
                  onClick={() => handleLike(room.id)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Room Image */}
              <div className="relative h-64">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedRoom.title}</h2>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedRoom.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500 mb-1">
                      <Star className="w-5 h-5 fill-current mr-1" />
                      <span className="font-semibold">{selectedRoom.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-6 p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="flex items-center text-3xl font-bold text-green-600">
                      <IndianRupee className="w-6 h-6 mr-1" />
                      {selectedRoom.rent.toLocaleString()}
                      <span className="text-lg text-gray-500 font-normal ml-2">/month</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Security Deposit: ₹{selectedRoom.deposit.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Room Details */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-semibold">{selectedRoom.bedrooms} Bedrooms</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-semibold">{selectedRoom.bathrooms} Bathrooms</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Building className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-semibold">{selectedRoom.area} sq ft</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedRoom.description}</p>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Tenant Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.preferences.map((preference, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
                      >
                        {preference}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Posted Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Posted by: <strong>{selectedRoom.postedBy}</strong></span>
                    <span>Posted on: {new Date(selectedRoom.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleLike(selectedRoom.id)}
                    className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Save Room
                  </button>
                  <button
                    onClick={() => handleContact(selectedRoom.id)}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Owner
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

export default RoomDiscovery;