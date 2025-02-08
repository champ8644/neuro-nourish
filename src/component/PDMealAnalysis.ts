interface FoodItem {
  name: string;
  confidence?: number;
}

interface ImageAnalysis {
  detectedItems: FoodItem[];
}

interface Macronutrients {
  protein: number; // in grams
  carbohydrates: number; // in grams
  fats: number; // in grams
}

interface NutritionalFacts {
  calories: number; // kcal
  macronutrients: Macronutrients;
  fiber: number; // grams (USDA)
  antioxidants: {
    level: string; // "Low", "Moderate", "High"
    sourceItems: string[]; // e.g. ["mixed greens", "quinoa"]
  };
  omega3FattyAcids: number; // mg
  vitaminB12: number; // μg
  vitaminD: number; // μg
  magnesium: number; // mg
}

interface MedicationInteraction {
  levodopa: {
    proteinImpact: string; // "Low", "Moderate", "High"
    recommendation: string; // e.g. "Take levodopa 30-45 minutes before this meal."
  };
}

interface DietaryPatterns {
  Mediterranean: boolean;
  MIND: boolean;
  DASH: boolean;
}

interface CompositeScores {
  pdFoodScore: number; // overall PD-Food Score (0-100)
  malnutritionRiskScore: number; // malnutrition risk (0-100, higher means higher risk)
}

interface AdditionalProperties {
  gutHealthScore: number; // 0-10 based on fiber/probiotic content
  glycemicIndexScore: number; // 0-10 (lower GI foods score higher)
  micronutrientScore: number; // 0-10 based on vitamin B12, D, and magnesium levels
}

interface Scores {
  pdFoodScore: CompositeScores;
  additionalProperties: AdditionalProperties;
}

/**
 * The PDMealAnalysis interface represents the output after analyzing a meal picture for a Parkinson's patient.
 *
 * Data is sourced from:
 * - USDA FoodData Central for nutritional values (https://fdc.nal.usda.gov/)
 * - FAO/WHO glycemic index tables for carbohydrate quality.
 * - Clinical studies (e.g., Clin. Neuropharmacol.) on protein–levodopa interactions.
 * - Mediterranean and MIND diet scoring systems from Trichopoulou et al. and Morris et al.
 * - NIH/WHO guidelines for vitamin B12, vitamin D, and magnesium.
 */
export interface PDMealAnalysis {
  foodItem: string;
  mealImageUrl: string; // URL to the meal picture
  imageAnalysis: ImageAnalysis;
  nutritionalFacts: NutritionalFacts;
  medicationInteraction: MedicationInteraction;
  dietaryPatterns: DietaryPatterns;
  scores: Scores;
  overallRecommendations: string;
}
