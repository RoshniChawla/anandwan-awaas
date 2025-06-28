import React from "react";
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ImageCarousel from '@/components/ImageCarousel';
import HeroSection from '@/components/HeroSection';
import { MapPin, Users2, Heart, BookOpen } from 'lucide-react';

const HomePage = () => {
  // Carousel Images
  const carouselImages = [
    {
      url: "https://assets.reflections.live/1704872077487-lr7ejutw.png",
      alt: "River between mountains under white clouds"
    },
    {
      url: "https://assets.reflections.live/1704872128029-lr7ejutw.png",
      alt: "Pine trees in forest"
    },
    {
      url: "https://www.hlimg.com/images/places2see/738X538/images-25-1510162336m.jpg?w=1080&dpr=1.3",
      alt: "Mountain hit by sun rays"
    },
    {
      url: "https://assets.reflections.live/1704872238980-lr7ejutw.png",
      alt: "Body of water surrounded by trees"
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <HeroSection
          title="Anandwan Awaas"
          subtitle="a compassionate community founded by Baba Amte, offering hope, healing, and harmony with nature."
          backgroundImage="https://images.pexels.com/photos/1083515/pexels-photo-1083515.jpeg?cs=srgb&dl=pexels-zhangkaiyv-1083515.jpg&fm=jpg"
          customContent={
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8"
                >
                  Register as Guest
                </Button>
              </Link>
              <Link to="/admin-login">
                <Button
                  size="lg"
                  className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8"
                >
                  Admin Login
                </Button>
              </Link>
            </div>
          }
          showButtons={false}
          className="min-h-[90vh] flex items-center"
        />

        {/* Experience Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-600">Experience Anandwan</h2>
              <p className="text-lg max-w-3xl mx-auto text-foreground">
                Founded by social worker Baba Amte, Anandwan is a community rehabilitation center and forest retreat where visitors can connect with nature, volunteer, and experience sustainable living.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {/* Nature Retreat */}
              <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary-600">Nature Retreat</h3>
                <p className="text-muted-foreground mb-4">
                  Immerse yourself in the peaceful forest surroundings and reconnect with nature.
                </p>
                <Link to="/about" className="text-accent-orange hover:text-accent-orange/90 flex items-center gap-2">
                  Learn more <span>→</span>
                </Link>
              </div>

              {/* Community Living */}
              <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <Users2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary-600">Community Living</h3>
                <p className="text-muted-foreground mb-4">
                  Experience a unique community that embraces diversity and promotes inclusion.
                </p>
                <Link to="/about" className="text-accent-orange hover:text-accent-orange/90 flex items-center gap-2">
                  Learn more <span>→</span>
                </Link>
              </div>

              {/* Volunteer */}
              <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary-600">Volunteer</h3>
                <p className="text-muted-foreground mb-4">
                  Contribute your skills and time to make a positive impact on the community.
                </p>
                <Link to="/guide" className="text-accent-orange hover:text-accent-orange/90 flex items-center gap-2">
                  How to volunteer <span>→</span>
                </Link>
              </div>

              {/* Stay & Learn */}
              <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary-600">Stay & Learn</h3>
                <p className="text-muted-foreground mb-4">
                  Book accommodations and participate in workshops on sustainable living.
                </p>
                <Link to="/register" className="text-accent-orange hover:text-accent-orange/90 flex items-center gap-2">
                  Book now <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section className="py-10 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Glimpses of Anandwan</h2>
              <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
                Explore the serene beauty and transformative experiences waiting for you at our retreat.
              </p>
            </div>
            <div className="max-w-2xl mx-auto h-[350px] rounded-xl overflow-hidden shadow-xl">
              <ImageCarousel images={carouselImages} />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-600">Guest Experiences</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from those who have experienced the transformation at Anandwan Awaas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Testimonial 1 */}
              <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                <p className="text-muted-foreground mb-4 italic">
                  "My stay at Anandwan changed my perspective on life. The peaceful environment and community activities were truly transformative."
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-primary-600">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Mumbai</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                <p className="text-muted-foreground mb-4 italic">
                  "I came here stressed and left rejuvenated. The staff is incredibly supportive and the nature walks are breathtaking."
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-primary-600">Raj Patel</p>
                  <p className="text-sm text-muted-foreground">Delhi</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                <p className="text-muted-foreground mb-4 italic">
                  "As a volunteer, I found purpose in contributing to Anandwan's mission. It's a place where compassion meets action."
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-primary-600">Meera Desai</p>
                  <p className="text-sm text-muted-foreground">Pune</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/register">
                <Button size="lg" className="bg-accent-orange hover:bg-accent-orange/90 text-white">
                  Book Your Stay
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
