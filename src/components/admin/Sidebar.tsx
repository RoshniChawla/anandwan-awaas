
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  Bell,
  LogOut,
  Settings,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-primary-600 text-white min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <p className="text-sm opacity-75">Anandwan Awaas</p>
      </div>
      
      <nav className="space-y-1">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md ${
            activeTab === "overview" ? "bg-primary-700 font-medium" : "hover:bg-primary-500"
          }`}
        >
          <Home size={18} />
          <span>Overview</span>
        </button>
        
        <button 
          onClick={() => setActiveTab("guests")}
          className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md ${
            activeTab === "guests" ? "bg-primary-700 font-medium" : "hover:bg-primary-500"
          }`}
        >
          <Users size={18} />
          <span>Guests</span>
        </button>
        
        <button 
          onClick={() => setActiveTab("events")}
          className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md ${
            activeTab === "events" ? "bg-primary-700 font-medium" : "hover:bg-primary-500"
          }`}
        >
          <Calendar size={18} />
          <span>Events</span>
        </button>
        
        <button 
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md ${
            activeTab === "notifications" ? "bg-primary-700 font-medium" : "hover:bg-primary-500"
          }`}
        >
          <Bell size={18} />
          <span>Notifications</span>
        </button>
      </nav>
      
      <div className="absolute bottom-4 w-56 space-y-1">
        <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-md hover:bg-primary-500">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        
        <Link to="/" className="flex items-center space-x-3 w-full px-3 py-2 rounded-md hover:bg-primary-500">
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
