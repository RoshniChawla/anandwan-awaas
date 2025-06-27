
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Notification {
  message: string;
  time: string;
  type: string;
}

interface NotificationsTabProps {
  notifications: Notification[];
}

const NotificationsTab = ({ notifications }: NotificationsTabProps) => {
  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Notifications & Alerts</CardTitle>
          <CardDescription>System messages and important updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  notification.type === 'warning' 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : notification.type === 'alert' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex justify-between">
                  <p className={`font-medium ${
                    notification.type === 'warning' 
                      ? 'text-yellow-800' 
                      : notification.type === 'alert' 
                        ? 'text-red-800' 
                        : 'text-blue-800'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
