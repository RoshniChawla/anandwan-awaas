import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Phone, 
  MapPin,
  Clock,
  Utensils
} from 'lucide-react';
import { Guest, CalendarEvent } from '@/types/admin';
import { getCalendarEvents, getMockGuests } from '@/services/adminApi';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarTab = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Use mock data for now - replace with actual API call
        const guests = getMockGuests();
        const calendarEvents: CalendarEvent[] = guests.map(guest => {
          const start = new Date(guest.arrivalDate);
          const end = new Date(guest.departureDate);
          
          // Set color based on status
          let color = '#3B82F6'; // blue for upcoming
          if (guest.status === 'current') {
            color = '#10B981'; // green for current
          } else if (guest.status === 'completed') {
            color = '#6B7280'; // gray for completed
          }

          return {
            id: guest.id,
            title: `${guest.name} - ${guest.purpose}`,
            start,
            end,
            guest,
            color,
          };
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '12px',
      },
    };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Booking Calendar</h2>
          <p className="text-muted-foreground">
            Visual overview of all guest bookings and arrivals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Add Booking
          </Button>
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Current Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Upcoming Bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span className="text-sm">Completed Stays</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent className="p-0">
          <div className="h-[600px] p-4">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              views={['month', 'week', 'day']}
              defaultView="month"
              selectable
              popup
              tooltipAccessor={(event) => `${event.title}\n${event.guest.phone}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Guest Details</DialogTitle>
              <DialogDescription>
                Complete information for this booking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedEvent.guest.name}</p>
                  <p className="text-sm text-muted-foreground">Guest ID: {selectedEvent.guest.id}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{selectedEvent.guest.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{selectedEvent.guest.purpose}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm">
                  <p>Arrival: {new Date(selectedEvent.guest.arrivalDate).toLocaleDateString()}</p>
                  <p>Departure: {new Date(selectedEvent.guest.departureDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Meals: {selectedEvent.guest.mealRequired ? 'Included' : 'Not required'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Badge variant="outline">{selectedEvent.guest.groupType}</Badge>
                <Badge 
                  className={
                    selectedEvent.guest.status === 'current' ? 'bg-green-100 text-green-800' :
                    selectedEvent.guest.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }
                >
                  {selectedEvent.guest.status}
                </Badge>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  Edit Booking
                </Button>
                <Button variant="outline" className="flex-1">
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarTab; 