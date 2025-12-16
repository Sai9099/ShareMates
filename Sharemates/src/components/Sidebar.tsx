import React from 'react';
import { 
  Home, 
  Search, 
  Users, 
  DollarSign, 
  CheckSquare,
  User,
  Clock,
  MessageCircle,
  History,
  HelpCircle,
  Settings,
  Bell
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  user, 
  onLogout 
}) => {
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'pending-tasks', label: 'Pending Tasks', icon: Clock },
    { id: 'roommates', label: 'Roommates', icon: Users },
    { id: 'bills-paid', label: 'Bills Paid', icon: DollarSign },
    { id: 'chats', label: 'Chats', icon: MessageCircle },
    { id: 'history', label: 'History', icon: History },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'reminder', label: 'Reminder', icon: Bell },
  ];

  const NavItem = ({ item, isActive, onClick }: { 
    item: { id: string; label: string; icon: any }; 
    isActive: boolean; 
    onClick: () => void; 
  }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-indigo-600 text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">ShareMates</h1>
        <p className="text-sm text-gray-500 mt-1">Roommate Management</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* Menu Items */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Menu
          </h2>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;