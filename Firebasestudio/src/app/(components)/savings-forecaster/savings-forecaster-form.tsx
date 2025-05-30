"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { getSavingsForecast, type SavingsForecasterState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Clock, Users, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const initialState: SavingsForecasterState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          Calculating...
        </>
      ) : (
        "Estimate Savings"
      )}
    </Button>
  );
}

export default function SavingsForecasterForm() {
  const [state, formAction] = useFormState(getSavingsForecast, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
    if (state?.message && !state.error) {
         toast({
            title: "Success",
            description: state.message,
            variant: "default", // Or a success variant if you have one
        });
    }
  }, [state, toast]);

  return (
    <section id="savings" className="section-padding bg-background">
      <div className="container-max mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Intelligent Savings Forecaster
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your potential cost reductions. Our AI analyzes your inputs to estimate how much InsightFlow AI could save your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <Card className="shadow-xl rounded-xl border-border/50">
            <CardHeader className="p-6 md:p-8">
              <CardTitle className="text-2xl font-semibold text-primary">Your Current Scenario</CardTitle>
              <CardDescription className="text-muted-foreground">
                Provide a few details about your current data analysis efforts.
              </CardDescription>
            </CardHeader>
            <form action={formAction}>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentSpendOnDataAnalysis" className="text-foreground flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-accent" />
                    Current Monthly Spend on Data Analysis (USD)
                  </Label>
                  <Input
                    id="currentSpendOnDataAnalysis"
                    name="currentSpendOnDataAnalysis"
                    type="number"
                    placeholder="e.g., 5000"
                    required
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedHoursSaved" className="text-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-accent" />
                    Estimated Hours Saved per Month with InsightFlow AI
                  </Label>
                  <Input
                    id="estimatedHoursSaved"
                    name="estimatedHoursSaved"
                    type="number"
                    placeholder="e.g., 40"
                    required
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-foreground flex items-center">
                    <Users className="w-4 h-4 mr-2 text-accent" />
                    Average Hourly Rate of Involved Employees (USD)
                  </Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    placeholder="e.g., 50"
                    required
                    className="h-12 text-base"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-6 md:p-8">
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>

          <Card className="shadow-xl rounded-xl border-border/50 bg-secondary/30 min-h-[300px]">
            <CardHeader className="p-6 md:p-8">
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-accent" />
                AI-Powered Savings Estimate
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your personalized forecast will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              {useFormStatus().pending && !state?.data && !state?.error && (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-full" />
                </div>
              )}
              {state?.error && (
                <div className="text-destructive flex items-start p-4 bg-destructive/10 rounded-md">
                  <AlertTriangle className="w-5 h-5 mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Calculation Error</h4>
                    <p className="text-sm">{state.error}</p>
                  </div>
                </div>
              )}
              {state?.data && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-md border border-green-500/30">
                    <p className="text-lg font-semibold text-green-700 flex items-center">
                       <CheckCircle2 className="w-5 h-5 mr-2"/> Estimated Monthly Savings:
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      ${state.data.estimatedSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Explanation:</h4>
                    <p className="text-muted-foreground whitespace-pre-line text-sm">{state.data.explanation}</p>
                  </div>
                </div>
              )}
              {!useFormStatus().pending && !state?.data && !state?.error && (
                 <p className="text-muted-foreground text-center py-8">Enter your details and click "Estimate Savings" to see your potential.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
