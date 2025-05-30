import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Zap, Brain, BarChartBig, Telescope } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-10 h-10 text-accent" />,
    title: 'Advanced Public Data Search',
    description: 'Leverage our powerful engine to scan and analyze extensive public datasets with unparalleled speed and precision.',
  },
  {
    icon: <Zap className="w-10 h-10 text-accent" />,
    title: 'Real-Time Data Processing',
    description: 'Gain immediate insights with our platform’s ability to process and interpret data as it happens.',
  },
  {
    icon: <Brain className="w-10 h-10 text-accent" />,
    title: 'Intelligent Analysis',
    description: 'Go beyond raw data. Our AI-driven algorithms uncover hidden patterns, trends, and correlations for deeper understanding.',
  },
  {
    icon: <Telescope className="w-10 h-10 text-accent" />,
    title: 'Comprehensive Coverage',
    description: 'Access a wide array of public data sources, from web content and social media to academic papers and government records.',
  },
  {
    icon: <BarChartBig className="w-10 h-10 text-accent" />,
    title: 'Actionable Visualizations',
    description: 'Transform complex data into clear, intuitive visualizations that drive informed decision-making.',
  },
  {
    icon: <Search className="w-10 h-10 text-accent" />, // Re-using Search as an example, can be replaced
    title: 'Customizable Queries',
    description: 'Tailor your searches with advanced filtering and query parameters to find exactly what you need.',
  },
];

export default function WhatItCanDoSection() {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-max mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Unlock the Power of Your Data
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            InsightFlow AI offers a suite of powerful capabilities designed to turn information overload into strategic advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border-border/50 overflow-hidden">
              <CardHeader className="p-6 bg-secondary/30">
                <div className="mb-4 flex justify-center items-center w-16 h-16 rounded-full bg-accent/10 text-accent mx-auto">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-primary text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
