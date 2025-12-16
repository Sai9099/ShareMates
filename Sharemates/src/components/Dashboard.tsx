import React, { useState } from 'react';
import { User, LogOut, Home, Building, Users, DollarSign, CheckSquare } from 'lucide-react';
import Sidebar from './Sidebar';
import BottomTaskbar from './BottomTaskbar';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import PendingTasks from './PendingTasks';
import RoommatesMenu from './RoommatesMenu';
import BillsPaid from './BillsPaid';
import Chats from './Chats';
import History from './History';
import Help from './Help';
import Settings from './Settings';
import Reminder from './Reminder';
import RoomDiscovery from './RoomDiscovery';
import RoommateDiscovery from './RoommateDiscovery';
import ExpenseSharing from './ExpenseSharing';
import ChoreAssignments from './ChoreAssignments';

export type ActiveTab = 'home' | 'rooms' | 'roommates' | 'expenses' | 'chores';

interface DashboardProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const renderContent = () => {
    // Check if we're in main navigation mode
    if (['dashboard', 'find-rooms', 'find-roommates', 'split-expenses', 'chore-assignments'].includes(activeSection)) {
      switch (activeSection) {
        case 'dashboard':
          return <DashboardHome user={user} setActiveTab={setActiveTab} />;
        case 'find-rooms':
          return <RoomDiscovery user={user} />;
        case 'find-roommates':
          return <RoommateDiscovery user={user} />;
        case 'split-expenses':
          return <ExpenseSharing user={user} />;
        case 'chore-assignments':
          return <ChoreAssignments user={user} />;
        default:
          return <DashboardHome user={user} setActiveTab={setActiveTab} />;
      }
    }
    
    // Handle sidebar menu items
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome user={user} setActiveTab={setActiveTab} />;
      case 'profile':
        return <Profile user={user} />;
      case 'pending-tasks':
        return <PendingTasks />;
      case 'roommates':
        return <RoommatesMenu user={user} />;
      case 'bills-paid':
        return <BillsPaid user={user} />;
      case 'chats':
        return <Chats user={user} />;
      case 'history':
        return <History />;
      case 'help':
        return <Help />;
      case 'settings':
        return <Settings user={user} />;
      case 'reminder':
        return <Reminder user={user} />;
      case 'find-rooms':
        return <RoomDiscovery />;
      case 'find-roommates':
        return <RoommateDiscovery />;
      case 'split-expenses':
        return <ExpenseSharing user={user} />;
      case 'chore-assignments':
        return <ChoreAssignments user={user} />;
      default:
        return <DashboardHome user={user} setActiveTab={setActiveTab} />;
    }
  };

  // Handle bottom navigation clicks
  const handleBottomNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setActiveSection('dashboard');
        break;
      case 'rooms':
        setActiveSection('find-rooms');
        break;
      case 'roommates':
        setActiveSection('find-roommates');
        break;
      case 'expenses':
        setActiveSection('split-expenses');
        break;
      case 'chores':
        setActiveSection('chore-assignments');
        break;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 pb-20">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {activeSection.replace('-', ' ')}
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium">{user.name}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomTaskbar 
        activeTab={activeTab} 
        setActiveTab={handleBottomNavClick}
      />
    </div>
  );
};

export default Dashboard;