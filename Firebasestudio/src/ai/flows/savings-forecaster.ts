// src/ai/flows/savings-forecaster.ts
'use server';

/**
 * @fileOverview An AI-powered savings estimator for potential BAHA AI users.
 *
 * - savingsForecaster - A function that estimates potential savings for users.
 * - SavingsForecasterInput - The input type for the savingsForecaster function.
 * - SavingsForecasterOutput - The return type for the savingsForecaster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SavingsForecasterInputSchema = z.object({
  currentSpendOnDataAnalysis: z
    .number()
    .describe('The current monthly spend on data analysis in USD.'),
  estimatedHoursSaved: z
    .number()
    .describe('The estimated number of hours saved per month by using BAHA AI.'),
  hourlyRate: z
    .number()
    .describe('The average hourly rate of employees involved in data analysis in USD.'),
});
export type SavingsForecasterInput = z.infer<typeof SavingsForecasterInputSchema>;

const SavingsForecasterOutputSchema = z.object({
  estimatedSavings: z
    .number()
    .describe('The estimated monthly savings in USD by using BAHA AI.'),
  explanation: z
    .string()
    .describe('A detailed explanation of how the savings were calculated.'),
});
export type SavingsForecasterOutput = z.infer<typeof SavingsForecasterOutputSchema>;

export async function savingsForecaster(input: SavingsForecasterInput): Promise<SavingsForecasterOutput> {
  return savingsForecasterFlow(input);
}

const savingsForecasterPrompt = ai.definePrompt({
  name: 'savingsForecasterPrompt',
  input: {schema: SavingsForecasterInputSchema},
  output: {schema: SavingsForecasterOutputSchema},
  prompt: `You are an expert in cost savings analysis for businesses. Given the following information, estimate the potential monthly savings a business could achieve by using BAHA AI. Provide a detailed explanation of your calculation.

Current monthly spend on data analysis: ${'{{currentSpendOnDataAnalysis}}'} USD
Estimated hours saved per month: ${'{{estimatedHoursSaved}}'}
Average hourly rate of employees: ${'{{hourlyRate}}'} USD

Consider the potential reduction in operational costs, increased efficiency, and other relevant factors.

Format your response as follows:
Estimated Savings: [estimated monthly savings in USD]
Explanation: [detailed explanation of the calculation]`,
});

const savingsForecasterFlow = ai.defineFlow(
  {
    name: 'savingsForecasterFlow',
    inputSchema: SavingsForecasterInputSchema,
    outputSchema: SavingsForecasterOutputSchema,
  },
  async input => {
    const {output} = await savingsForecasterPrompt(input);
    return output!;
  }
);
