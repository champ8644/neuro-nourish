import logo from "./logo.svg";
import "./App.css";

import data from "./data.json";
import PaginatedMealAnalysisDashboard from "./component/PaginatedMealAnalysisDashboard";

function App() {
  const { mealAnalyses } = data;
  return (
    <div className="App">
      <PaginatedMealAnalysisDashboard data={mealAnalyses} />
    </div>
  );
}

export default App;
