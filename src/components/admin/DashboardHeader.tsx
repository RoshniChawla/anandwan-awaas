
import { Bell, User } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome, Admin</h1>
        <p className="text-gray-600">Here's what's happening at Anandwan Awaas today</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-500" />
        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
          <User className="h-5 w-5 text-primary-600" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
