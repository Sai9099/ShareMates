import React from 'react';
import { Home, Building, Users, DollarSign, CheckSquare } from 'lucide-react';
import { ActiveTab } from './Dashboard';

interface BottomTaskbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const BottomTaskbar: React.FC<BottomTaskbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Home },
    { id: 'rooms' as ActiveTab, label: 'Find Rooms', icon: Building },
    { id: 'roommates' as ActiveTab, label: 'Find Mates', icon: Users },
    { id: 'expenses' as ActiveTab, label: 'Expenses', icon: DollarSign },
    { id: 'chores' as ActiveTab, label: 'Tasks', icon: CheckSquare },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-purple-100' 
                  : 'hover:bg-gray-100'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-medium mt-1 ${
                isActive ? 'text-purple-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTaskbar;