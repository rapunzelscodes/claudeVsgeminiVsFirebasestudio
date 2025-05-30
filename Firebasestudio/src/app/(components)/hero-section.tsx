import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-background text-primary-foreground section-padding pt-32 md:pt-40 min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Subtle background pattern or abstract shapes */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>
      <div className="container-max mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          Transform <span className="text-accent">Data</span> into
          <br className="hidden md:block" /> Actionable <span className="text-accent">Insights</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 text-primary-foreground/80">
          Unlock the power of your data with InsightFlow AI. Our cutting-edge platform analyzes vast information landscapes to deliver the clarity you need for strategic decision-making.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-7 px-10 rounded-lg shadow-xl transition-transform hover:scale-105">
            <Link href="#pricing">Discover Your Edge</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 text-lg py-7 px-10 rounded-lg shadow-xl transition-transform hover:scale-105">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
      {/* Optional: Add a subtle visual element or image here */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 opacity-5" data-ai-hint="abstract data visualization">
         {/* Placeholder for a more complex SVG or image */}
      </div>
    </section>
  );
}
