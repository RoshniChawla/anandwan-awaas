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
      <div className="bg-neutral-beige min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
                <p className="text-gray-700 mb-6">
                  Thank you for registering with Anandwan Awaas. We've sent a confirmation email to your inbox with all the details of your registration. Our team will review your submission and get in touch with you shortly.
                </p>
                <Button onClick={() => window.location.href = "/"} className="bg-primary-500 hover:bg-primary-600 text-white">
                  Return to Home
                </Button>
              </div>
            ) : (
              <div className="glassmorphism rounded-lg overflow-hidden">
                <div className="p-8">
                  <h1 className="text-3xl font-bold mb-2">Guest Registration</h1>
                  <p className="text-gray-700 mb-6">
                    Fill out the form below to register as a guest at Anandwan Awaas.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
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
                          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
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
                          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
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
                        <Label htmlFor="purpose">Purpose of Visit <span className="text-red-500">*</span></Label>
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
                          <Label>Date of Arrival <span className="text-red-500">*</span></Label>
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
                          <Label>Date of Departure <span className="text-red-500">*</span></Label>
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
                                disabled={(date) => date < new Date() || (formData.arrivalDate ? date < formData.arrivalDate : false)}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mealRequired"
                            checked={formData.mealRequired}
                            onCheckedChange={(checked) =>
                              setFormData(prev => ({ ...prev, mealRequired: checked as boolean }))
                            }
                          />
                          <Label htmlFor="mealRequired">Include meals during stay</Label>
                        </div>

                        <div className="space-y-2">
                          <Label>Booking Type <span className="text-red-500">*</span></Label>
                          <Select
                            onValueChange={(value) => {
                              handleSelectChange("groupType", value);
                              if (value === "single") {
                                handleSelectChange("groupSize", "1");
                              }
                            }}
                            value={formData.groupType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select booking type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="group">Group</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {formData.groupType === "group" && (
                          <div className="space-y-2">
                            <Label>Number of People <span className="text-red-500">*</span></Label>
                            <Select
                              onValueChange={(value) => handleSelectChange("groupSize", value)}
                              value={formData.groupSize}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select group size" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} People
                                  </SelectItem>
                                ))}
                                <SelectItem value="more">More than 10 (Contact us)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Any special requests, dietary preferences, or additional information we should know"
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Registration"}
                      </Button>
                    </div>
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
