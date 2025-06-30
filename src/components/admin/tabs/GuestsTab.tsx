import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  Calendar,
  Phone,
  MapPin
} from 'lucide-react';
import { Guest } from '@/types/admin';
import { getGuests, getMockGuests } from '@/services/adminApi';
import ExportGuestData from '../ExportGuestData';

const GuestsTab = () => {
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [purposeFilter, setPurposeFilter] = useState<string>('all');
  const [groupTypeFilter, setGroupTypeFilter] = useState<string>('all');

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        // Use mock data for now - replace with actual API call
        const data = getMockGuests();
        setGuests(data);
        setFilteredGuests(data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  useEffect(() => {
    let filtered = guests;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone.includes(searchTerm) ||
        guest.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(guest => guest.status === statusFilter);
    }

    // Apply purpose filter
    if (purposeFilter !== 'all') {
      filtered = filtered.filter(guest => guest.purpose === purposeFilter);
    }

    // Apply group type filter
    if (groupTypeFilter !== 'all') {
      filtered = filtered.filter(guest => guest.groupType === groupTypeFilter);
    }

    setFilteredGuests(filtered);
  }, [guests, searchTerm, statusFilter, purposeFilter, groupTypeFilter]);

  const getStatusBadge = (status: string) => {
    const variants = {
      current: 'bg-green-100 text-green-800',
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getGroupTypeBadge = (groupType: string) => {
    const variants = {
      family: 'bg-purple-100 text-purple-800',
      single: 'bg-orange-100 text-orange-800',
      group: 'bg-indigo-100 text-indigo-800',
      volunteer: 'bg-teal-100 text-teal-800',
    };
    return (
      <Badge className={variants[groupType as keyof typeof variants]}>
        {groupType.charAt(0).toUpperCase() + groupType.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Guest Management</h2>
          <p className="text-muted-foreground">
            Manage and track all guest registrations
          </p>
        </div>
        <div className="flex gap-2">
          <ExportGuestData guests={guests} />
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={purposeFilter} onValueChange={setPurposeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purposes</SelectItem>
                <SelectItem value="Medical Treatment">Medical Treatment</SelectItem>
                <SelectItem value="Volunteer Work">Volunteer Work</SelectItem>
                <SelectItem value="Family Visit">Family Visit</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
            <Select value={groupTypeFilter} onValueChange={setGroupTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Group Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="group">Group</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Guest Table */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Registrations</CardTitle>
          <CardDescription>
            Showing {filteredGuests.length} of {guests.length} guests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Visit Details</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{guest.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {guest.id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-1" />
                        {guest.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(guest.arrivalDate).toLocaleDateString()}
                        </div>
                        <div className="text-muted-foreground">
                          to {new Date(guest.departureDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{guest.purpose}</div>
                      {guest.mealRequired && (
                        <Badge variant="secondary" className="text-xs">
                          Meals Included
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {getGroupTypeBadge(guest.groupType)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(guest.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Guest Details</DialogTitle>
                              <DialogDescription>
                                Complete information for {guest.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Name</label>
                                  <p className="text-sm text-muted-foreground">{guest.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="text-sm text-muted-foreground">{guest.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Arrival</label>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(guest.arrivalDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Departure</label>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(guest.departureDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Purpose</label>
                                  <p className="text-sm text-muted-foreground">{guest.purpose}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Group Type</label>
                                  <p className="text-sm text-muted-foreground">{guest.groupType}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestsTab; 