import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "",
    arrivalDate: undefined as Date | undefined,
    departureDate: undefined as Date | undefined,
    mealRequired: false,
    groupType: "single",
    groupSize: "1",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.purpose || !formData.arrivalDate || !formData.departureDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/guests", {
        ...formData,
        arrivalDate: formData.arrivalDate?.toISOString(),
        departureDate: formData.departureDate?.toISOString(),
      });

      console.log("✅ API Success:", response.data);

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Registration Successful",
        description: "We'll contact you shortly with confirmation details.",
      });
    } catch (error: any) {
      console.error("❌ API Error:", error);
      toast({
        title: "Submission Failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="bg-card rounded-lg p-8 shadow-lg text-center border border-border">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Registration Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for registering with Anandwan Awaas. We've sent a confirmation email to your inbox with all the details of your registration. Our team will review your submission and get in touch with you shortly.
                </p>
                <Button onClick={() => window.location.href = "/"} className="bg-primary-500 hover:bg-primary-600 text-white">
                  Return to Home
                </Button>
              </div>
            ) : (
              <div className="glassmorphism rounded-lg overflow-hidden bg-card border border-border">
                <div className="p-8">
                  <h1 className="text-3xl font-bold mb-2 text-foreground">Guest Registration</h1>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form below to register as a guest at Anandwan Awaas.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-foreground">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-foreground">Email <span className="text-red-500">*</span></Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-foreground">Phone Number <span className="text-red-500">*</span></Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="purpose" className="text-foreground">Purpose of Visit <span className="text-red-500">*</span></Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("purpose", value)}
                          value={formData.purpose}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select purpose of your visit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retreat">Personal Retreat</SelectItem>
                            <SelectItem value="volunteer">Volunteering</SelectItem>
                            <SelectItem value="learning">Educational Workshop</SelectItem>
                            <SelectItem value="wellness">Wellness Program</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-foreground">Date of Arrival <span className="text-red-500">*</span></Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.arrivalDate ? format(formData.arrivalDate, "PPP") : <span>Select date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={formData.arrivalDate}
                                onSelect={(date) => handleDateChange("arrivalDate", date)}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label className="text-foreground">Date of Departure <span className="text-red-500">*</span></Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.departureDate ? format(formData.departureDate, "PPP") : <span>Select date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={formData.departureDate}
                                onSelect={(date) => handleDateChange("departureDate", date)}
                                initialFocus
                                disabled={(date) => date < (formData.arrivalDate || new Date())}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mealRequired"
                          checked={formData.mealRequired}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, mealRequired: !!checked }))}
                        />
                        <Label htmlFor="mealRequired" className="text-muted-foreground">Include meals during stay</Label>
                      </div>
                      <div>
                        <Label htmlFor="groupType" className="text-foreground">Booking Type <span className="text-red-500">*</span></Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("groupType", value)}
                          value={formData.groupType}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select booking type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="group">Group</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="specialRequests" className="text-foreground">Special Requests or Notes</Label>
                        <Textarea
                          id="specialRequests"
                          name="specialRequests"
                          placeholder="Any special requests, dietary preferences, or additional information we should know"
                          value={formData.specialRequests || ""}
                          onChange={handleChange}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;
