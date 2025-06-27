import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Anandwan Awaas</h1>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 mb-8">
              A nature-connected wellness retreat fostering compassion, community, and sustainable living.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="w-16 h-1 bg-primary-500 mb-6"></div>
              <p className="text-gray-700 mb-4">
                At Anandwan Awaas, our mission is to create a nurturing sanctuary where individuals of all abilities find dignity, opportunity, and connection. Rooted in compassion, we provide a space where people can heal, grow, and contribute meaningfully—regardless of physical challenges or background.
              </p>
              <p className="text-gray-700">
                We are committed to fostering a diverse and inclusive community that values disability empowerment, women's employment, and collective well-being. Our programs are designed to promote sustainable living, mindfulness, and social responsibility, offering a platform for self-reliance, skill development, and lifelong learning.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://assets.reflections.live/1704872077487-lr7ejutw.png" 
                alt="Foggy mountain summit" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Anandwan Awaas: A Sanctuary of Healing and Service</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 text-gray-700 text-lg leading-relaxed">
            <p>
              Founded in 1992 as a small meditation center, Anandwan Awaas has grown into a haven for healing, community, and sustainable living. Rooted in compassion, it offers support and dignity to leprosy patients and others in need, while nurturing a deep connection to nature.
            </p>

            <p>
              What began with five simple huts is now a thriving center powered by organic farming, renewable energy, and eco-friendly construction. Since 2005, our volunteer program has brought thousands of people from around the world to contribute to reforestation, holistic care, and community development.
            </p>

            <p>
              Today, Anandwan Awaas continues to inspire through service, sustainability, and the belief that healing the Earth goes hand in hand with healing ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-700">
              These principles guide everything we do at Anandwan Awaas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-beige p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Compassion</h3>
              <p className="text-gray-700">
                We practice kindness and empathy in all interactions, recognizing the inherent dignity of every individual.
              </p>
            </div>

            <div className="bg-neutral-beige p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-700">
                We strive to minimize our environmental footprint and protect natural resources for future generations.
              </p>
            </div>

            <div className="bg-neutral-beige p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-700">
                We foster meaningful connections and collaborative relationships that enrich lives and build resilience.
              </p>
            </div>

            <div className="bg-neutral-beige p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-700">
                We uphold the highest standards of honesty, transparency, and ethical conduct in all our operations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
