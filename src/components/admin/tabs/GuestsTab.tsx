
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Guest {
  name: string;
  arrival: string;
  departure: string;
  purpose: string;
}

interface GuestsTabProps {
  guests: Guest[];
}

const GuestsTab = ({ guests }: GuestsTabProps) => {
  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Guest Management</CardTitle>
              <CardDescription>View and manage guest registrations</CardDescription>
            </div>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              Add New Guest
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Arrival</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Departure</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Purpose</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {guests.map((guest, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{guest.name}</td>
                    <td className="px-4 py-3">{guest.arrival}</td>
                    <td className="px-4 py-3">{guest.departure}</td>
                    <td className="px-4 py-3">{guest.purpose}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-primary-500 hover:text-primary-700">Edit</button>
                        <button className="text-gray-500 hover:text-gray-700">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestsTab;
