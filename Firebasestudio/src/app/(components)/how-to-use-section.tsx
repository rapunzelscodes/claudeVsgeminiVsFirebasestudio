import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Award, PlayCircle, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-8 h-8 text-primary" />,
    title: 'Sign Up in Seconds',
    description: 'Create your InsightFlow AI account with a simple and quick registration process. No lengthy forms, just essential details to get you started.',
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: 'Receive Free Credits',
    description: 'As a new user, you’ll automatically receive a complimentary bundle of search credits to explore the full power of our platform risk-free.',
  },
  {
    icon: <PlayCircle className="w-8 h-8 text-primary" />,
    title: 'Explore & Analyze',
    description: 'Dive into our intuitive interface. Start running queries, analyzing data, and discovering insights with your free credits.',
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: 'Upgrade & Scale',
    description: 'Once you experience the value, easily choose a plan that fits your needs and scale your data analysis capabilities as your organization grows.',
  },
];

export default function HowToUseSection() {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="container-max mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Accessing the transformative power of InsightFlow AI is straightforward. Follow these simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border-border/50 flex flex-col">
              <CardHeader className="p-6">
                <div className="mb-4 flex justify-center items-center w-16 h-16 rounded-full bg-accent/10 text-accent mx-auto">
                  {/* Using a styled div for the number instead of directly using icon for the step number */}
                  <span className="text-3xl font-bold text-accent">{index + 1}</span>
                </div>
                <CardTitle className="text-xl font-semibold text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow">
                <CardDescription className="text-muted-foreground">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
