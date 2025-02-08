import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PDMealAnalysis } from "./PDMealAnalysis"; // Your imported type

// Helper function for gauge styling
const gaugeStyle = (value: number) =>
  buildStyles({
    textSize: "16px",
    pathColor: `rgba(62, 152, 199, ${value / 100})`,
    textColor: "#3e98c7",
    trailColor: "#d6d6d6",
  });

// Table component for displaying detailed meal analysis
const MealAnalysisTable: React.FC<{ data: PDMealAnalysis }> = ({ data }) => (
  <TableContainer component={Paper} sx={{ mb: 2, backgroundColor: "#f7f7f7" }}>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell variant="head">
            <strong>Identified Foods</strong>
          </TableCell>
          <TableCell>
            {data.imageAnalysis.detectedItems
              .map((item) => item.name)
              .join(", ")}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Calories</strong>
          </TableCell>
          <TableCell>{data.nutritionalFacts.calories} kcal</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Macronutrients</strong>
          </TableCell>
          <TableCell>
            {data.nutritionalFacts.macronutrients.protein}g protein,{" "}
            {data.nutritionalFacts.macronutrients.carbohydrates}g carbs,{" "}
            {data.nutritionalFacts.macronutrients.fats}g fats
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Fiber</strong>
          </TableCell>
          <TableCell>{data.nutritionalFacts.fiber} g</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Antioxidants</strong>
          </TableCell>
          <TableCell>
            {data.nutritionalFacts.antioxidants.level} (Sources:{" "}
            {data.nutritionalFacts.antioxidants.sourceItems.join(", ")})
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Omega-3</strong>
          </TableCell>
          <TableCell>{data.nutritionalFacts.omega3FattyAcids} mg</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Micronutrients</strong>
          </TableCell>
          <TableCell>
            Vitamin B12: {data.nutritionalFacts.vitaminB12} μg, Vitamin D:{" "}
            {data.nutritionalFacts.vitaminD} μg, Magnesium:{" "}
            {data.nutritionalFacts.magnesium} mg
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Medication Interaction</strong>
          </TableCell>
          <TableCell>
            {data.medicationInteraction.levodopa.recommendation}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            <strong>Dietary Patterns</strong>
          </TableCell>
          <TableCell>
            Mediterranean: {data.dietaryPatterns.Mediterranean ? "Yes" : "No"},
            MIND: {data.dietaryPatterns.MIND ? "Yes" : "No"}, DASH:{" "}
            {data.dietaryPatterns.DASH ? "Yes" : "No"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

// Main Dashboard Component
const MealAnalysisDashboard: React.FC<{ data: PDMealAnalysis }> = ({
  data,
}) => {
  return (
    <Box sx={{ backgroundColor: "#eaeaea", minHeight: "100vh", py: 4 }}>
      <Grid2 container spacing={3} gap={3} sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Left Panel: Meal Image */}
        <Grid2 size={{ xs: 12, md: 5 }} component="div">
          <Paper
            elevation={3}
            sx={{ p: 2, backgroundColor: "white", borderRadius: 2 }}
          >
            <img
              src={data.mealImageUrl}
              alt={data.foodItem}
              style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
            />
            <Typography variant="h6" sx={{ mt: 1 }}>
              {data.foodItem}
            </Typography>
          </Paper>
        </Grid2>

        {/* Right Panel: Analysis Details & Dashboard Gauges */}
        <Grid2 size={{ xs: 12, md: 7 }} component="div">
          <Paper
            elevation={3}
            sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}
          >
            {/* Dashboard Gauges */}
            <Grid2 container spacing={2} gap={2} sx={{ mt: 2 }}>
              <Grid2 size={{ xs: 6, sm: 4 }} component="div">
                <Typography align="center" sx={{ mb: 1 }}>
                  PD-Food Score
                </Typography>
                <CircularProgressbar
                  value={data.scores.pdFoodScore.pdFoodScore}
                  text={`${data.scores.pdFoodScore.pdFoodScore}`}
                  styles={gaugeStyle(data.scores.pdFoodScore.pdFoodScore)}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 4 }} component="div">
                <Typography align="center" sx={{ mb: 1 }}>
                  Malnutrition Risk
                </Typography>
                <CircularProgressbar
                  value={data.scores.pdFoodScore.malnutritionRiskScore}
                  text={`${data.scores.pdFoodScore.malnutritionRiskScore}`}
                  styles={gaugeStyle(
                    100 - data.scores.pdFoodScore.malnutritionRiskScore
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 4 }} component="div">
                <Typography align="center" sx={{ mb: 1 }}>
                  Gut Health
                </Typography>
                <CircularProgressbar
                  value={data.scores.additionalProperties.gutHealthScore * 10}
                  text={`${data.scores.additionalProperties.gutHealthScore}/10`}
                  styles={gaugeStyle(
                    data.scores.additionalProperties.gutHealthScore * 10
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 4 }} component="div">
                <Typography align="center" sx={{ mb: 1 }}>
                  Glycemic Index
                </Typography>
                <CircularProgressbar
                  value={
                    data.scores.additionalProperties.glycemicIndexScore * 10
                  }
                  text={`${data.scores.additionalProperties.glycemicIndexScore}/10`}
                  styles={gaugeStyle(
                    data.scores.additionalProperties.glycemicIndexScore * 10
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 4 }} component="div">
                <Typography align="center" sx={{ mb: 1 }}>
                  Micronutrients
                </Typography>
                <CircularProgressbar
                  value={
                    data.scores.additionalProperties.micronutrientScore * 10
                  }
                  text={`${data.scores.additionalProperties.micronutrientScore}/10`}
                  styles={gaugeStyle(
                    data.scores.additionalProperties.micronutrientScore * 10
                  )}
                />
              </Grid2>
            </Grid2>

            <Typography variant="h5" gutterBottom>
              Meal Analysis Details
            </Typography>
            <MealAnalysisTable data={data} />

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Overall Recommendations</Typography>
              <Typography variant="body1">
                {data.overallRecommendations}
              </Typography>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MealAnalysisDashboard;
