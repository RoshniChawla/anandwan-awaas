import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BedDouble, Trees, Heart, Gift } from 'lucide-react';

const GuidePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#2B6747]">What a Guest Can Do</h1>
            <p className="text-lg text-[#2B6747] mb-6">
              Discover the various activities and opportunities available during your stay at Anandwan Awaas
            </p>
          </div>
        </div>
      </section>

      {/* Guide Cards Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Register to Stay Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#2B6747] rounded-full flex items-center justify-center">
                  <BedDouble className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2B6747]">Register to Stay</h2>
              </div>
              <p className="text-gray-700 mb-6">
                Begin your journey by registering as a guest. Our accommodations range from shared dormitories to private cottages, all designed with sustainable practices in mind.
              </p>
              <ul className="space-y-4 mb-8 text-gray-700">
                <li>• Complete the online registration form</li>
                <li>• Choose your preferred accommodation type</li>
                <li>• Select your dates of arrival and departure</li>
                <li>• Receive confirmation and pre-arrival information</li>
              </ul>
              <Link to="/register">
                <Button className="bg-[#FF9130] hover:bg-[#FF9130]/90 text-white">
                  Register Now
                </Button>
              </Link>
            </div>

            {/* Explore the Environment Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#2B6747] rounded-full flex items-center justify-center">
                  <Trees className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2B6747]">Explore the Environment</h2>
              </div>
              <p className="text-gray-700 mb-6">
                Immerse yourself in the beautiful forest surroundings. Our guided nature walks and trails offer a chance to reconnect with the natural world.
              </p>
              <ul className="space-y-4 mb-8 text-gray-700">
                <li>• Daily guided forest walks at sunrise and sunset</li>
                <li>• Bird watching tours with local experts</li>
                <li>• Meditation spots in serene natural settings</li>
                <li>• Educational ecology tours to learn about local flora and fauna</li>
              </ul>
            </div>

            {/* Volunteer Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#2B6747] rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2B6747]">Volunteer</h2>
              </div>
              <p className="text-gray-700 mb-6">
                Contribute to our community and environmental projects. Volunteering at Anandwan Awaas is a rewarding way to give back while learning new skills.
              </p>
              <ul className="space-y-4 mb-8 text-gray-700">
                <li>• Organic gardening and permaculture</li>
                <li>• Teaching skills to local children</li>
                <li>• Assisting in community kitchen</li>
                <li>• Participating in reforestation projects</li>
                <li>• Craft and artisan workshops</li>
              </ul>
            </div>

            {/* Donate Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#2B6747] rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2B6747]">Donate</h2>
              </div>
              <p className="text-gray-700 mb-6">
                Support our mission through donations. Your contribution helps us maintain our facilities, expand our programs, and provide scholarships for those who cannot afford to stay.
              </p>
              <ul className="space-y-4 mb-8 text-gray-700">
                <li>• One-time financial donations</li>
                <li>• Monthly sponsorship programs</li>
                <li>• Material donations (books, tools, supplies)</li>
                <li>• Sponsor a tree or garden plot</li>
              </ul>
              <Link to="/donate">
                <Button className="bg-[#FF9130] hover:bg-[#FF9130]/90 text-white">
                  Donate Now
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuidePage;
