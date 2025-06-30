import axios from 'axios';
import { 
  BookingData, 
  GroupTypeData, 
  BookingInsights, 
  Guest, 
  Donor, 
  DonationSummary, 
  CommunityStats,
  Feedback,
  GalleryMoment,
  ApiResponse,
  PaginatedResponse 
} from '@/types/admin';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with auth interceptor
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Booking Analytics API
export const getBookingAnalytics = async (): Promise<{
  monthlyData: BookingData[];
  groupTypeData: GroupTypeData[];
  insights: BookingInsights;
}> => {
  const response = await api.get<ApiResponse<{
    monthlyData: BookingData[];
    groupTypeData: GroupTypeData[];
    insights: BookingInsights;
  }>>('/admin/booking-analytics');
  return response.data.data;
};

// Guest Management API
export const getGuests = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  purpose?: string;
  groupType?: string;
}): Promise<PaginatedResponse<Guest>> => {
  const response = await api.get<ApiResponse<PaginatedResponse<Guest>>>('/admin/guests', { params });
  return response.data.data;
};

export const getGuestById = async (id: string): Promise<Guest> => {
  const response = await api.get<ApiResponse<Guest>>(`/admin/guests/${id}`);
  return response.data.data;
};

// Calendar Events API
export const getCalendarEvents = async (start: Date, end: Date): Promise<Guest[]> => {
  const response = await api.get<ApiResponse<Guest[]>>('/admin/calendar-events', {
    params: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
  });
  return response.data.data;
};

// Donor Management API
export const getDonors = async (params?: {
  page?: number;
  limit?: number;
  type?: string;
  mode?: string;
}): Promise<PaginatedResponse<Donor>> => {
  const response = await api.get<ApiResponse<PaginatedResponse<Donor>>>('/admin/donors', { params });
  return response.data.data;
};

export const getDonationSummary = async (): Promise<DonationSummary> => {
  const response = await api.get<ApiResponse<DonationSummary>>('/admin/donation-summary');
  return response.data.data;
};

// Community Overview API
export const getCommunityStats = async (): Promise<CommunityStats> => {
  const response = await api.get<ApiResponse<CommunityStats>>('/admin/community-stats');
  return response.data.data;
};

export const getFeedback = async (): Promise<Feedback[]> => {
  const response = await api.get<ApiResponse<Feedback[]>>('/admin/feedback');
  return response.data.data;
};

export const getGalleryMoments = async (): Promise<GalleryMoment[]> => {
  const response = await api.get<ApiResponse<GalleryMoment[]>>('/admin/gallery-moments');
  return response.data.data;
};

// Mock data for development (remove in production)
export const getMockBookingAnalytics = () => ({
  monthlyData: [
    { month: 'Jan', bookings: 45, meals: 120 },
    { month: 'Feb', bookings: 52, meals: 145 },
    { month: 'Mar', bookings: 48, meals: 135 },
    { month: 'Apr', bookings: 61, meals: 180 },
    { month: 'May', bookings: 55, meals: 165 },
    { month: 'Jun', bookings: 58, meals: 170 },
  ],
  groupTypeData: [
    { type: 'Family', count: 35, percentage: 40 },
    { type: 'Single', count: 25, percentage: 28 },
    { type: 'Group', count: 18, percentage: 20 },
    { type: 'Volunteer', count: 10, percentage: 12 },
  ],
  insights: {
    averageStayDuration: '3.2 days',
    mostCommonPurpose: 'Medical Treatment',
    peakBookingMonth: 'April',
    currentMonthBookings: 58,
    lastMonthBookings: 55,
    percentageChange: 5.5,
  },
});

export const getMockGuests = (): Guest[] => [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    arrivalDate: '2024-01-15',
    departureDate: '2024-01-18',
    purpose: 'Medical Treatment',
    groupType: 'family',
    mealRequired: true,
    status: 'current',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 87654 32109',
    arrivalDate: '2024-01-20',
    departureDate: '2024-01-22',
    purpose: 'Volunteer Work',
    groupType: 'single',
    mealRequired: false,
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'Amit Patel',
    phone: '+91 76543 21098',
    arrivalDate: '2024-01-10',
    departureDate: '2024-01-12',
    purpose: 'Family Visit',
    groupType: 'family',
    mealRequired: true,
    status: 'completed',
  },
];

export const getMockDonors = (): Donor[] => [
  {
    id: '1',
    name: 'Dr. Meera Singh',
    amount: 50000,
    date: '2024-01-15',
    mode: 'bank_transfer',
    type: 'recurring',
    notes: 'Monthly donation for medical supplies',
  },
  {
    id: '2',
    name: 'Anand Foundation',
    amount: 100000,
    date: '2024-01-10',
    mode: 'cheque',
    type: 'one_time',
    notes: 'Infrastructure development',
  },
  {
    id: '3',
    name: 'Rahul Verma',
    amount: 25000,
    date: '2024-01-05',
    mode: 'online',
    type: 'recurring',
  },
];

export const getMockCommunityStats = (): CommunityStats => ({
  visitorsToday: 12,
  activeVolunteers: 8,
  childrenInCare: 45,
  patientsReceivingTreatment: 23,
  treesPlanted: 156,
  programsConducted: 4,
}); 