import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const benefits = [
  "Answer complex questions with data-driven confidence.",
  "Transform raw data into strategic business intelligence.",
  "Accelerate research and discovery cycles significantly.",
  "Identify emerging trends and market opportunities early.",
  "Optimize operations and resource allocation effectively.",
  "Enhance competitive advantage through superior insights."
];

export default function HowItWillChangeBusinessSection() {
  return (
    <section id="benefits" className="section-padding bg-secondary/30">
      <div className="container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Revolutionize Your Business Intelligence
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              InsightFlow AI is not just another data tool; it's a paradigm shift in how organizations access, analyze, and act upon information. Our advanced computing power and sophisticated algorithms empower you to:
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 shrink-0" />
                  <span className="text-muted-foreground text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg md:text-xl text-muted-foreground">
              Embrace the future of decision-making and unlock unprecedented growth with InsightFlow AI.
            </p>
          </div>
          <div className="order-1 md:order-2 relative group">
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Business strategy and data analysis"
                width={600}
                height={400}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="business strategy"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300"></div>
            </div>
             <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300 animate-pulse"></div>
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-ping-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
