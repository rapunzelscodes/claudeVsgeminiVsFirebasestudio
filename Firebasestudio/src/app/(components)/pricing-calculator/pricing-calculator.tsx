"use client";

import { useState, useEffect, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CURRENCIES, PRICING_TIERS, BASE_CREDIT_PRICE_USD, MIN_DAILY_SEARCHES, MAX_DAILY_SEARCHES, DAILY_SEARCH_STEP, DEFAULT_DAILY_SEARCHES, type Currency } from '@/lib/constants';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { TrendingUp, Tag, CalendarDays, Search } from 'lucide-react';

export default function PricingCalculator() {
  const [dailySearches, setDailySearches]  = useState<number[]>([DEFAULT_DAILY_SEARCHES]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);

  const monthlySearches = useMemo(() => dailySearches[0] * 30, [dailySearches]);
  
  const creditsToPurchase = useMemo(() => {
    const calculated = Math.ceil(monthlySearches / 50) * 50;
    return Math.max(50, calculated); // Minimum 50 credits
  }, [monthlySearches]);

  const currentTier = useMemo(() => {
    return PRICING_TIERS.find(tier => 
      creditsToPurchase >= tier.minCredits && (tier.maxCredits === null || creditsToPurchase <= tier.maxCredits)
    ) || PRICING_TIERS[0];
  }, [creditsToPurchase]);

  const discountPercent = currentTier.discountPercent;
  const originalPricePerCredit = BASE_CREDIT_PRICE_USD * selectedCurrency.rate;
  const discountedPricePerCredit = originalPricePerCredit * (1 - discountPercent / 100);
  const totalMonthlyCost = discountedPricePerCredit * creditsToPurchase;

  // Animated values
  const animatedDailySearches = useAnimatedCounter(dailySearches[0]);
  const animatedMonthlySearches = useAnimatedCounter(monthlySearches);
  const animatedCreditsToPurchase = useAnimatedCounter(creditsToPurchase);
  const animatedOriginalPrice = useAnimatedCounter(originalPricePerCredit);
  const animatedDiscountedPrice = useAnimatedCounter(discountedPricePerCredit);
  const animatedDiscountPercent = useAnimatedCounter(discountPercent);
  const animatedTotalMonthlyCost = useAnimatedCounter(totalMonthlyCost);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: selectedCurrency.code, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return `${value.toFixed(0)}%`;
  };

  return (
    <section id="pricing" className="section-padding bg-secondary/30">
      <div className="container-max mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Flexible Pricing, Powerful Results
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Estimate your monthly investment with our interactive calculator. Adjust your daily search volume and see how our tiered discounts benefit you.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden border-border/50">
          <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardTitle className="text-2xl md:text-3xl font-semibold">Estimate Your Costs</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-sm md:text-base">
              Credits are purchased in buckets of 50. Monthly costs are based on estimated daily searches.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            {/* Left Column: Inputs */}
            <div className="space-y-8">
              <div>
                <label htmlFor="daily-searches" className="block text-sm font-medium text-foreground mb-2">
                  Estimated Daily Searches
                </label>
                <Slider
                  id="daily-searches"
                  min={MIN_DAILY_SEARCHES}
                  max={MAX_DAILY_SEARCHES}
                  step={DAILY_SEARCH_STEP}
                  value={dailySearches}
                  onValueChange={setDailySearches}
                  className="[&>span:first-child]:h-3 [&>span:first-child>span]:h-3 [&>span:last-child]:h-5 [&>span:last-child]:w-5"
                />
                <div className="text-center text-2xl font-bold text-primary mt-2">{animatedDailySearches}</div>
              </div>

              <div>
                <label htmlFor="currency-select" className="block text-sm font-medium text-foreground mb-2">
                  Select Currency
                </label>
                <Select
                  value={selectedCurrency.code}
                  onValueChange={(value) => {
                    setSelectedCurrency(CURRENCIES.find(c => c.code === value) || CURRENCIES[0]);
                  }}
                >
                  <SelectTrigger id="currency-select" className="w-full h-12 text-base">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map(currency => (
                      <SelectItem key={currency.code} value={currency.code} className="text-base">
                        {currency.code} ({currency.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column: Outputs */}
            <div className="space-y-4 bg-background/50 p-6 rounded-lg border border-border/30">
              <h3 className="text-xl font-semibold text-primary mb-4 border-b pb-2">Summary</h3>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center"><Search className="w-4 h-4 mr-2 text-accent" />Monthly Searches:</span>
                <span className="font-semibold text-foreground">{animatedMonthlySearches.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center"><CalendarDays className="w-4 h-4 mr-2 text-accent" />Credits to Purchase:</span>
                <span className="font-semibold text-foreground">{animatedCreditsToPurchase.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Original Price / Credit:</span>
                <span className="font-semibold text-foreground">{formatCurrency(animatedOriginalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center"><Tag className="w-4 h-4 mr-2 text-accent" />Discount Applied:</span>
                <span className="font-semibold text-green-600">{formatPercentage(animatedDiscountPercent)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Discounted Price / Credit:</span>
                <span className="font-semibold text-foreground">{formatCurrency(animatedDiscountedPrice)}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex justify-between items-center text-xl font-bold text-primary">
                  <span className="flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-accent" />Total Monthly Cost:</span>
                  <span>{formatCurrency(animatedTotalMonthlyCost)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 md:p-8 bg-secondary/20 border-t border-border/30">
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3">
              Choose Plan & Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
