# PD Meal Analysis App

A React-based dashboard application that analyzes meal images to provide nutritional information and tailored recommendations for Parkinson’s disease (PD) patients. The app extracts food items from an image, retrieves nutritional data from trusted sources, and presents a detailed analysis—including medication interaction, dietary pattern alignment, and composite scores—using a modern Material‑UI dashboard with pagination.

---

## Table of Contents

- [Overview](#overview)
- [Data Sources and Trusted References](#data-sources-and-trusted-references)
- [Design Rationale](#design-rationale)
  - [Food Identification & Image Analysis](#food-identification--image-analysis)
  - [Nutritional Breakdown](#nutritional-breakdown)
  - [Medication Interaction](#medication-interaction)
  - [Dietary Patterns](#dietary-patterns)
  - [Composite Scores](#composite-scores)
  - [Additional Properties](#additional-properties)
- [TypeScript Schema](#typescript-schema)
- [Sample JSON Data](#sample-json-data)
- [React UI Components](#react-ui-components)
  - [MealAnalysisDashboard](#mealanalysisdashboard)
  - [PaginatedMealAnalysisDashboard](#paginatedmealanalysisdashboard)
- [Usage](#usage)
- [License](#license)

---

## Overview

The **PD Meal Analysis App** is designed to assist Parkinson’s patients in managing their nutrition by analyzing meal images and providing:

- Detailed nutritional breakdown (calories, macronutrients, fiber, antioxidants, omega‑3, key micronutrients)
- Medication interaction advice (protein’s effect on levodopa absorption)
- Dietary pattern compatibility (Mediterranean, MIND, DASH)
- Composite scores to quickly assess meal quality for PD care
- A paginated dashboard for reviewing multiple meal analyses

---

## Data Sources and Trusted References

- **USDA FoodData Central**  
  Provides detailed nutritional data for food items.  
  [USDA FoodData Central](https://fdc.nal.usda.gov/)

- **FAO/WHO Glycemic Index Tables**  
  Used to estimate the glycemic index (GI) of carbohydrate sources.

- **Clinical Studies (e.g., Clin. Neuropharmacol.)**  
  Demonstrate that high protein intake can reduce levodopa absorption.

- **Dietary Pattern Scoring Systems**  
  Research by Trichopoulou et al. and Morris et al. supports the benefits of the Mediterranean and MIND diets for PD.

- **NIH/WHO Micronutrient Guidelines**  
  Provide recommendations for vitamin B12, vitamin D, and magnesium.

- **Gut Health**  
  USDA fiber data and clinical guidelines support the role of dietary fiber and probiotic foods in maintaining a healthy gut.

---

## Design Rationale

### Food Identification & Image Analysis

- **Rationale:**  
  The app uses AI to extract food items from a meal image, then retrieves nutritional information from a trusted database.
- **Data Source:**  
  USDA FoodData Central and food recognition APIs.
- **Reference:**  
  [USDA FoodData Central](https://fdc.nal.usda.gov/)

### Nutritional Breakdown

- **Rationale:**  
  Provides key details such as calories, macronutrients, fiber, antioxidants, omega‑3 fatty acids, and key micronutrients (vitamin B12, D, magnesium) that are essential for PD management.
- **Data Source:**  
  USDA FoodData Central.
- **Reference:**  
  [USDA FoodData Central](https://fdc.nal.usda.gov/)

### Medication Interaction (Protein–Levodopa)

- **Rationale:**  
  High protein intake can reduce the absorption of levodopa. The app offers recommendations for optimal meal timing relative to medication.
- **Reference:**  
  Clinical research in _Clin. Neuropharmacol._

### Dietary Patterns

- **Rationale:**  
  Mediterranean and MIND diets are associated with better outcomes in PD. The app scores meals based on alignment with these patterns.
- **Reference:**  
  Research by Trichopoulou et al. and Morris et al.

### Composite Scores

- **PD-Food Score:**  
  Aggregates nutritional quality and dietary pattern alignment into an overall score (0–100).
- **Malnutrition Risk Score:**  
  Evaluates whether the meal meets the nutritional needs for PD patients.
- **Reference:**  
  Established nutrition quality indices and clinical guidelines.

### Additional Properties

- **Gut Health Score:**  
  Based on fiber content and the presence of probiotic foods.
- **Glycemic Index Score:**  
  Assesses the quality of carbohydrates.
- **Micronutrient Score:**  
  Focuses on vitamin B12, vitamin D, and magnesium.
- **Data Sources:**  
  USDA FoodData Central, FAO/WHO GI tables, and NIH/WHO guidelines.

---

## TypeScript Schema

```typescript
/**
 * PDMealAnalysis represents the output after analyzing a meal picture for a Parkinson's patient.
 *
 * Data Sources & References:
 * - Nutritional data: USDA FoodData Central (https://fdc.nal.usda.gov/)
 * - Glycemic Index values: FAO/WHO glycemic index tables.
 * - Protein–Levodopa Interaction: Clinical studies (e.g., Clin. Neuropharmacol.)
 * - Dietary Pattern Scoring: Research by Trichopoulou et al. and Morris et al.
 * - Micronutrient Guidelines: NIH/WHO recommendations.
 * - Gut Health: USDA fiber data and clinical guidelines for constipation in PD.
 */
export interface FoodItem {
  name: string;
  confidence?: number;
}

export interface ImageAnalysis {
  detectedItems: FoodItem[];
}

export interface Macronutrients {
  protein: number;
  carbohydrates: number;
  fats: number;
}

export interface NutritionalFacts {
  calories: number;
  macronutrients: Macronutrients;
  fiber: number;
  antioxidants: {
    level: string;
    sourceItems: string[];
  };
  omega3FattyAcids: number;
  vitaminB12: number;
  vitaminD: number;
  magnesium: number;
}

export interface MedicationInteraction {
  levodopa: {
    proteinImpact: string;
    recommendation: string;
  };
}

export interface DietaryPatterns {
  Mediterranean: boolean;
  MIND: boolean;
  DASH: boolean;
}

export interface CompositeScores {
  pdFoodScore: number;
  malnutritionRiskScore: number;
}

export interface AdditionalProperties {
  gutHealthScore: number;
  glycemicIndexScore: number;
  micronutrientScore: number;
}

export interface Scores {
  pdFoodScore: CompositeScores;
  additionalProperties: AdditionalProperties;
}

export interface PDMealAnalysis {
  foodItem: string;
  mealImageUrl: string;
  imageAnalysis: ImageAnalysis;
  nutritionalFacts: NutritionalFacts;
  medicationInteraction: MedicationInteraction;
  dietaryPatterns: DietaryPatterns;
  scores: Scores;
  overallRecommendations: string;
}
```
