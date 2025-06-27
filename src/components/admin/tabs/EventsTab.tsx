
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  name: string;
  date: string;
  location: string;
  attendees: number;
}

interface EventsTabProps {
  events: Event[];
}

const EventsTab = ({ events }: EventsTabProps) => {
  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>Manage upcoming activities and programs</CardDescription>
            </div>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              Schedule New Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Event Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Date</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Location</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Attendees</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {events.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{event.name}</td>
                    <td className="px-4 py-3">{event.date}</td>
                    <td className="px-4 py-3">{event.location}</td>
                    <td className="px-4 py-3">{event.attendees}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-primary-500 hover:text-primary-700">Edit</button>
                        <button className="text-red-500 hover:text-red-700">Cancel</button>
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

export default EventsTab;
