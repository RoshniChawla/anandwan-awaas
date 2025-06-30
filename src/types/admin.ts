import { ReactNode } from "react";

export interface FacilityStats {
  [key: string]: string;
}

export interface FacilityData {
  name: string;
  icon: ReactNode;
  stats: FacilityStats;
  status: string;
}

// Booking Analytics Types
export interface BookingData {
  month: string;
  bookings: number;
  meals: number;
}

export interface GroupTypeData {
  type: string;
  count: number;
  percentage: number;
}

export interface BookingInsights {
  averageStayDuration: string;
  mostCommonPurpose: string;
  peakBookingMonth: string;
  currentMonthBookings: number;
  lastMonthBookings: number;
  percentageChange: number;
}

// Guest Types
export interface Guest {
  id: string;
  name: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  purpose: string;
  groupType: 'single' | 'family' | 'group' | 'volunteer';
  mealRequired: boolean;
  status: 'current' | 'upcoming' | 'completed';
}

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  guest: Guest;
  color: string;
}

// Donor Types
export interface Donor {
  id: string;
  name: string;
  amount: number;
  date: string;
  mode: 'online' | 'cash' | 'cheque' | 'bank_transfer';
  type: 'recurring' | 'one_time';
  notes?: string;
}

export interface DonationSummary {
  lastDonation: Donor;
  totalAmount: number;
  totalDonors: number;
  recurringDonors: number;
}

// Community Overview Types
export interface CommunityStats {
  visitorsToday: number;
  activeVolunteers: number;
  childrenInCare: number;
  patientsReceivingTreatment: number;
  treesPlanted: number;
  programsConducted: number;
}

export interface Feedback {
  id: string;
  message: string;
  author: string;
  date: string;
  rating: number;
}

export interface GalleryMoment {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 