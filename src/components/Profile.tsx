import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone, MapPin, Calendar, CreditCard as Edit3, Save, X, Camera } from 'lucide-react';
import { User } from '../App';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Looking for clean, friendly roommates who respect shared spaces.',
    interests: ['Cooking', 'Reading', 'Yoga', 'Movies'],
    preferences: ['Non-smoker', 'Vegetarian', 'Quiet environment']
  });

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user.name,
      email: user.email,
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      bio: 'Looking for clean, friendly roommates who respect shared spaces.',
      interests: ['Cooking', 'Reading', 'Yoga', 'Movies'],
      preferences: ['Non-smoker', 'Vegetarian', 'Quiet environment']
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="text-xl font-bold text-gray-900 text-center w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
              )}
              
              <p className="text-gray-600 mb-4">ShareMates Member</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {profileData.email}
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined January 2024
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profileData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Tell others about yourself..."
              />
            ) : (
              <p className="text-gray-700">{profileData.bio}</p>
            )}
          </div>

          {/* Interests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profileData.interests.join(', ')}
                  onChange={(e) => setProfileData({...profileData, interests: e.target.value.split(', ')})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter interests separated by commas"
                />
                <p className="text-sm text-gray-500">Separate interests with commas</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Living Preferences</h3>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profileData.preferences.join(', ')}
                  onChange={(e) => setProfileData({...profileData, preferences: e.target.value.split(', ')})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter preferences separated by commas"
                />
                <p className="text-sm text-gray-500">Separate preferences with commas</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.preferences.map((preference, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                  >
                    {preference}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;