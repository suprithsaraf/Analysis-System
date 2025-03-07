import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import DesignForm from "./components/CreateDesign";
import HeatAnalysis from "./components/HeatAnalysis";
import CityRankings from "./components/cityRankings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-design" element={<DesignForm />} />
        <Route path="/Heat" element={<HeatAnalysis />} />
        <Route path="/city" element={<CityRankings />} />
      </Routes>
    </Router>
  );
}

export default App;
