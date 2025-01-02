import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MeetingPage from "./pages/MeetingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MeetingPage" element={<MeetingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
