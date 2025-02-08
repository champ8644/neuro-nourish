import React, { useState } from "react";
import { Box, Pagination, Paper, Typography } from "@mui/material";
import MealAnalysisDashboard from "./MealAnalysisDashboard"; // The component from above
import { PDMealAnalysis } from "./PDMealAnalysis";

type Props = {
  data: PDMealAnalysis[];
  itemsPerPage?: number;
};

const PaginatedMealAnalysisDashboard: React.FC<Props> = ({
  data,
  itemsPerPage = 1,
}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log({ event, value });
    setPage(value);
  };

  // For simplicity, display one item per page
  const startIndex = (page - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ backgroundColor: "#eaeaea", minHeight: "100vh", py: 4 }}>
      {/* Header */}
      <Paper
        elevation={4}
        sx={{
          mb: 4,
          mx: "auto",
          maxWidth: 1200,
          p: 3,
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center">
          Parkinson's Meal Analysis Dashboard
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>

      {currentData.map((meal, index) => (
        <MealAnalysisDashboard key={index} data={meal} />
      ))}
    </Box>
  );
};

export default PaginatedMealAnalysisDashboard;
