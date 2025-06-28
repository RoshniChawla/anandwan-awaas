import React from "react";
import Layout from "../components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FaqsPage = () => {
  const faqs = [
    {
      question: "How do I register for a stay at Anandwan Awaas?",
      answer: "You can register for a stay by filling out our online registration form on the 'Register' page. You'll need to provide your personal details, purpose of visit, and preferred dates. Once submitted, you'll receive a confirmation email with further instructions."
    },
    {
      question: "What accommodation options are available?",
      answer: "We offer various accommodation options ranging from shared dormitories to private cottages. All our accommodations are designed to be eco-friendly and blend harmoniously with the natural surroundings. Specific options and rates can be viewed during the registration process."
    },
    {
      question: "Is food provided during the stay?",
      answer: "Yes, we provide organic vegetarian meals prepared from locally sourced ingredients. Most produce comes from our own gardens. We serve breakfast, lunch, and dinner daily. Special dietary requirements can be accommodated with advance notice."
    },
    {
      question: "What activities are available for guests?",
      answer: "We offer a variety of activities including guided nature walks, meditation sessions, yoga classes, organic farming workshops, handicraft making, community service opportunities, cultural performances, and educational talks on sustainability and wellness."
    },
    {
      question: "Can I volunteer during my stay?",
      answer: "Absolutely! We welcome guests who wish to volunteer. Opportunities include helping with forest conservation, organic farming, teaching, administrative tasks, and skill-sharing workshops. You can indicate your interest in volunteering during registration."
    },
    {
      question: "How do I reach Anandwan Awaas?",
      answer: "Anandwan Awaas is located in Warora, Chandrapur District, Maharashtra. The nearest railway station is Warora, and the nearest airport is in Nagpur (approximately 140 km away). We can arrange transportation from these locations with advance notice, or provide detailed directions if you're coming by your own vehicle."
    },
    {
      question: "What should I pack for my stay?",
      answer: "We recommend bringing comfortable clothing suitable for forest environments, sturdy walking shoes, a reusable water bottle, personal toiletries (preferably eco-friendly), any required medications, a flashlight, insect repellent, and a light jacket or shawl for evenings. Detailed packing suggestions will be included in your confirmation email."
    },
    {
      question: "Is Wi-Fi available?",
      answer: "Limited Wi-Fi is available in common areas, but we encourage guests to disconnect from technology and connect with nature during their stay. Mobile network coverage varies throughout the property."
    },
    {
      question: "Are there any age restrictions for guests?",
      answer: "Anandwan Awaas welcomes guests of all ages. However, certain activities may have age recommendations or restrictions for safety reasons. Children under 18 must be accompanied by an adult at all times."
    },
    {
      question: "How can I make a donation to support Anandwan Awaas?",
      answer: "You can make donations through our website's 'Donate' page. We accept various payment methods including credit/debit cards, bank transfers, and digital wallets. All donations go directly toward supporting our conservation efforts, community development programs, and operational costs."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Frequently Asked Questions</h1>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about Anandwan Awaas and planning your visit.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg overflow-hidden bg-card">
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-muted text-foreground">
                    <span className="font-medium text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FaqsPage;
