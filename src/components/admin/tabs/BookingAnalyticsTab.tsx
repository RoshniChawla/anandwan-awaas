import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Users, Calendar, Utensils } from 'lucide-react';
import { 
  BookingData, 
  GroupTypeData, 
  BookingInsights 
} from '@/types/admin';
import { getBookingAnalytics, getMockBookingAnalytics } from '@/services/adminApi';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BookingAnalyticsTab = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<{
    monthlyData: BookingData[];
    groupTypeData: GroupTypeData[];
    insights: BookingInsights;
  } | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Use mock data for now - replace with actual API call
        const data = getMockBookingAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (!analytics) {
    return <div>Error loading analytics data</div>;
  }

  const { monthlyData, groupTypeData, insights } = analytics;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booking Analytics</h2>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.currentMonthBookings}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {insights.percentageChange > 0 ? (
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
              )}
              {Math.abs(insights.percentageChange)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Stay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.averageStayDuration}</div>
            <p className="text-xs text-muted-foreground">Per guest</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.peakBookingMonth}</div>
            <p className="text-xs text-muted-foreground">Highest bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Purpose</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{insights.mostCommonPurpose}</div>
            <p className="text-xs text-muted-foreground">Most frequent</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings Trend</CardTitle>
            <CardDescription>Booking and meal requests over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#0088FE" name="Bookings" />
                <Bar dataKey="meals" fill="#00C49F" name="Meal Requests" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Group Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Type Distribution</CardTitle>
            <CardDescription>Breakdown by visitor type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={groupTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percentage }) => `${type} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {groupTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Smart recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Positive Trends</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-2 mt-0.5">✓</Badge>
                  Family bookings increased by 15% this month
                </li>
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-2 mt-0.5">✓</Badge>
                  Average stay duration is optimal at 3.2 days
                </li>
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-2 mt-0.5">✓</Badge>
                  Volunteer engagement is growing steadily
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600">Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Badge variant="outline" className="mr-2 mt-0.5">💡</Badge>
                  Consider adding more single-room accommodations
                </li>
                <li className="flex items-start">
                  <Badge variant="outline" className="mr-2 mt-0.5">💡</Badge>
                  Peak season marketing for April bookings
                </li>
                <li className="flex items-start">
                  <Badge variant="outline" className="mr-2 mt-0.5">💡</Badge>
                  Expand medical treatment facilities
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingAnalyticsTab; 