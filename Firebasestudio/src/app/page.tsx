import HeroSection from './(components)/hero-section';
import WhatItCanDoSection from './(components)/what-it-can-do-section';
import HowItWillChangeBusinessSection from './(components)/how-it-will-change-business-section';
import HowToUseSection from './(components)/how-to-use-section';
import TestimonialsSection from './(components)/testimonials-section';
import PricingCalculator from './(components)/pricing-calculator/pricing-calculator';
import SavingsForecasterForm from './(components)/savings-forecaster/savings-forecaster-form';
import FinalCTASection from './(components)/final-cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatItCanDoSection />
      <HowItWillChangeBusinessSection />
      <HowToUseSection />
      <PricingCalculator />
      <SavingsForecasterForm />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}
