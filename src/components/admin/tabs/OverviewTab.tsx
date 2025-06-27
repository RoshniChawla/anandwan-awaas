
import { FacilityData } from "@/types/admin";
import FacilityCard from "../FacilityCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
  facilities: FacilityData[];
  recentGuests: any[];
  upcomingEvents: any[];
}

const OverviewTab = ({ facilities, recentGuests, upcomingEvents }: OverviewTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold mb-4">Facilities Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <FacilityCard
            key={index}
            name={facility.name}
            icon={facility.icon}
            stats={facility.stats}
            status={facility.status}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>Latest guest check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGuests.slice(0, 3).map((guest, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{guest.name}</p>
                    <p className="text-sm text-gray-500">{guest.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Arrival: {guest.arrival}</p>
                    <p className="text-sm">Departure: {guest.departure}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 p-2">
            <Button variant="link" className="text-primary-600 p-0 h-auto w-full text-center">
              View All Guests
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled activities and programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.slice(0, 3).map((event, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Date: {event.date}</p>
                    <p className="text-sm">Attendees: {event.attendees}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 p-2">
            <Button variant="link" className="text-primary-600 p-0 h-auto w-full text-center">
              View All Events
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
