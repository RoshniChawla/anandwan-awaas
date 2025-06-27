import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("custom");
  };

  const getSelectedAmount = () => {
    if (amount === "custom") {
      return customAmount;
    }
    return amount;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedAmount = getSelectedAmount();
    
    // Basic validation
    if (!selectedAmount || isNaN(Number(selectedAmount)) || Number(selectedAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }
    
    if (!fullName || !email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log({
        amount: selectedAmount,
        type: donationType,
        name: fullName,
        email,
        message,
      });
      
      setIsLoading(false);
      setIsCompleted(true);
      toast({
        title: "Thank you for your donation!",
        description: "Your contribution will help support our mission.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="bg-neutral-beige min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
              <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Your contribution helps us maintain and expand our programs while keeping our services accessible to all. 
                Every donation makes a difference in our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Donation Form */}
              {!isCompleted ? (
                <div className="glassmorphism rounded-lg overflow-hidden order-2 md:order-1">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Donation Type */}
                      <div>
                        <Label className="mb-2 block">Donation Type</Label>
                        <RadioGroup
                          value={donationType}
                          onValueChange={setDonationType}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one-time" id="one-time" />
                            <Label htmlFor="one-time" className="font-normal">One-time</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="monthly" />
                            <Label htmlFor="monthly" className="font-normal">Monthly</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Amount Selection */}
                      <div>
                        <Label className="mb-2 block">Select Amount</Label>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {["500", "1000", "2500", "5000", "10000", "custom"].map((option) => (
                            <Button
                              key={option}
                              type="button"
                              variant={amount === option ? "default" : "outline"}
                              className={amount === option ? "bg-primary-500" : ""}
                              onClick={() => handleAmountSelect(option)}
                            >
                              {option === "custom" ? "Custom" : `₹${option}`}
                            </Button>
                          ))}
                        </div>
                        
                        {amount === "custom" && (
                          <div className="mt-3">
                            <Label htmlFor="customAmount">Enter Amount (₹)</Label>
                            <Input
                              id="customAmount"
                              type="number"
                              placeholder="Enter amount"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Share why you're supporting us"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Processing..." : "Complete Donation"}
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center pt-2">
                        Your donation is eligible for tax benefits under applicable laws.
                      </p>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="glassmorphism rounded-lg overflow-hidden order-2 md:order-1">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                    <p className="text-gray-700 mb-6">
                      Your donation has been successfully processed. We've sent a confirmation to your email with the receipt and tax information.
                    </p>
                    <p className="text-lg font-medium text-primary-600 mb-6">
                      Your contribution makes a difference!
                    </p>
                    <Button onClick={() => window.location.href = "/"} className="bg-primary-500 hover:bg-primary-600 text-white">
                      Return to Home
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Impact Information */}
              <div className="order-1 md:order-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Your Impact</h2>
                    
                    <div className="space-y-6">
                      <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-lg font-bold mb-2">Forest Conservation</h3>
                        <p className="text-gray-700">
                          Your donation helps protect and restore forest ecosystems, supporting biodiversity and carbon sequestration efforts.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-lg font-bold mb-2">Community Development</h3>
                        <p className="text-gray-700">
                          Contributions fund educational programs, vocational training, and sustainable livelihood initiatives for local communities.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-lg font-bold mb-2">Wellness Centers</h3>
                        <p className="text-gray-700">
                          Your support helps maintain our wellness facilities and ensures holistic health services remain accessible to all.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-lg font-bold mb-2">Sustainable Infrastructure</h3>
                        <p className="text-gray-700">
                          Donations help develop and maintain eco-friendly facilities that minimize our environmental footprint.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-neutral-beige p-4 rounded-lg">
                      <h3 className="text-lg font-bold mb-2">Transparency Promise</h3>
                      <p className="text-gray-700">
                        We're committed to transparency in how we use donations. Detailed financial reports are published annually and available to all supporters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;
