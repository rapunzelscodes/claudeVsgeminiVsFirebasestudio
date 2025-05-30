import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-primary via-accent to-primary">
      <div className="container-max mx-auto text-center">
        <Zap className="w-16 h-16 text-primary-foreground/80 mx-auto mb-6 animate-pulse" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6">
          Ready to Elevate Your Insights?
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          Don't let valuable data slip through your fingers. Join InsightFlow AI today and start transforming information into your most powerful asset. Experience the future of business intelligence.
        </p>
        <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 text-xl py-8 px-12 rounded-lg shadow-2xl group transition-all duration-300 hover:shadow-accent/50">
          <Link href="#pricing">
            Get Started Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
        <p className="mt-8 text-sm text-primary-foreground/70">
          First-time users receive free credits to explore our platform!
        </p>
      </div>
    </section>
  );
}
