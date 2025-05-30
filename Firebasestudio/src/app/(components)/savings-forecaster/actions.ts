"use server";

import { savingsForecaster, type SavingsForecasterInput, type SavingsForecasterOutput } from "@/ai/flows/savings-forecaster";

export interface SavingsForecasterState {
  data?: SavingsForecasterOutput;
  error?: string;
  message?: string;
}

export async function getSavingsForecast(
  prevState: SavingsForecasterState,
  formData: FormData
): Promise<SavingsForecasterState> {
  try {
    const currentSpendOnDataAnalysis = Number(formData.get("currentSpendOnDataAnalysis"));
    const estimatedHoursSaved = Number(formData.get("estimatedHoursSaved"));
    const hourlyRate = Number(formData.get("hourlyRate"));

    if (isNaN(currentSpendOnDataAnalysis) || isNaN(estimatedHoursSaved) || isNaN(hourlyRate)) {
      return { error: "Invalid input. Please ensure all fields are numbers." };
    }
    
    if (currentSpendOnDataAnalysis <= 0 || estimatedHoursSaved <= 0 || hourlyRate <= 0) {
        return { error: "All input values must be positive numbers." };
    }


    const input: SavingsForecasterInput = {
      currentSpendOnDataAnalysis,
      estimatedHoursSaved,
      hourlyRate,
    };

    const result = await savingsForecaster(input);
    
    if (result && result.estimatedSavings !== undefined) {
        return { data: result, message: "Forecast generated successfully!" };
    } else {
        // This case might indicate an issue with the AI flow itself or unexpected output format
        console.error("AI Flow returned unexpected data:", result);
        return { error: "Failed to generate forecast. The AI model might be unavailable or returned an unexpected response." };
    }

  } catch (e) {
    console.error("Error in savings forecaster action:", e);
    let errorMessage = "An unexpected error occurred while generating the forecast.";
    if (e instanceof Error) {
        errorMessage = e.message;
    }
    return { error: errorMessage };
  }
}
