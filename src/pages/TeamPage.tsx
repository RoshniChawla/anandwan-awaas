import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  contact?: string;
}

const TeamPage = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Anika Sharma",
      role: "Founder & Director",
      bio: "Dr. Anika founded Anandwan Awaas in 1985 after a successful career in environmental science. Her vision for a sustainable forest retreat has transformed countless lives and inspired environmental conservation efforts across the region.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      contact: "anika@anandwanawaas.org"
    },
    {
      name: "Rajiv Mehta",
      role: "Operations Manager",
      bio: "Rajiv oversees the day-to-day operations of Anandwan Awaas. With over 15 years of experience in hospitality and retreat management, he ensures that every guest's experience is seamless and memorable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      contact: "rajiv@anandwanawaas.org"
    },
    {
      name: "Dr. Vikram Singh",
      role: "Wellness Director",
      bio: "Dr. Vikram brings his expertise in Ayurvedic medicine and holistic health to our wellness programs. He has developed signature treatments that combine traditional wisdom with modern approaches to health and wellbeing.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      contact: "vikram@anandwanawaas.org"
    },
    {
      name: "Meera Patel",
      role: "Community Outreach Manager",
      bio: "Meera coordinates our relationships with local communities and volunteers. Her passion for social development has created strong bonds between Anandwan Awaas and surrounding villages.",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      contact: "meera@anandwanawaas.org"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Team</h1>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground mb-8">
              Meet the dedicated individuals who make Anandwan Awaas a transformative experience.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="glassmorphism rounded-lg overflow-hidden hover:shadow-xl transition-shadow bg-card border border-border">
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-2 text-sm">{member.role}</p>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-4">{member.bio}</p>
                  {member.contact && (
                    <a
                      href={`mailto:${member.contact}`}
                      className="text-xs text-primary-500 hover:text-primary-700 inline-block"
                    >
                      Contact
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center text-foreground">
          <h2 className="text-3xl font-bold mb-4">Volunteer With Us</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Can't join full-time? Consider volunteering! We offer various opportunities for individuals who want to contribute to our mission while gaining valuable experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/guide">
              <Button size="lg" className="bg-accent-orange hover:bg-accent-orange/90 text-white">
                Learn About Volunteering
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
