"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image'; // Using next/image for placeholder avatars

const testimonials = [
  {
    quote: "InsightFlow AI has revolutionized how we approach market research. The speed and depth of analysis are unparalleled, giving us a significant competitive edge.",
    name: "Sarah L., CMO",
    company: "Tech Innovators Inc.",
    avatarHint: "woman portrait",
  },
  {
    quote: "The ability to process vast amounts of public data and extract meaningful insights has saved us countless hours and resources. It's an indispensable tool for our team.",
    name: "John B., Lead Data Scientist",
    company: "Global Solutions Ltd.",
    avatarHint: "man portrait",
  },
  {
    quote: "We were looking for a way to understand complex trends quickly. InsightFlow AI delivered beyond our expectations, transforming our decision-making process.",
    name: "Emily K., Strategy Director",
    company: "Future Forward Group",
    avatarHint: "person professional",
  },
   {
    quote: "The free credits to start were fantastic. We could fully test the platform's capabilities before committing, and we were blown away by the results.",
    name: "David P., Startup Founder",
    company: "Agile Ventures",
    avatarHint: "young entrepreneur",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-secondary/30">
      <div className="container-max mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Trusted by Innovators
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what our satisfied customers are saying about InsightFlow AI and its impact on their success.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Card className="shadow-xl rounded-xl overflow-hidden border-border/50">
            <CardContent className="p-8 md:p-12 text-center min-h-[350px] md:min-h-[300px] flex flex-col justify-center items-center">
              <Quote className="w-12 h-12 text-accent/50 mb-6 transform rotate-180" />
              <p className="text-xl md:text-2xl italic text-foreground mb-8 leading-relaxed">
                "{currentTestimonial.quote}"
              </p>
              <div className="flex items-center justify-center">
                <Avatar className="w-16 h-16 mr-4 border-2 border-accent">
                  <Image 
                    src={`https://placehold.co/100x100.png?text=${currentTestimonial.name.charAt(0)}`} 
                    alt={currentTestimonial.name} 
                    width={100} 
                    height={100}
                    data-ai-hint={currentTestimonial.avatarHint}
                    className="object-cover"
                  />
                  <AvatarFallback>{currentTestimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-primary text-lg">{currentTestimonial.name}</p>
                  <p className="text-muted-foreground">{currentTestimonial.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-16 transform rounded-full w-12 h-12 bg-background/80 hover:bg-background shadow-md border-border/50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-16 transform rounded-full w-12 h-12 bg-background/80 hover:bg-background shadow-md border-border/50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </Button>
        </div>
         <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-accent scale-125' : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
      </div>
    </section>
  );
}
