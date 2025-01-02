import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MeetingArrivalPage from "./pages/MeetingArrivalPage";
import MeetingConfigPage from "./pages/MeetingConfigPage";
import MeetingRoomPage from "./pages/MeetingRoomPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MeetingArrivalPage" element={<MeetingArrivalPage />} />
        <Route path="/MeetingConfigPage" element={<MeetingConfigPage />} />
        <Route path="/MeetingRoomPage" element={<MeetingRoomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
