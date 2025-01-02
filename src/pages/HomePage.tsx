import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh", fontFamily: "Arial, sans-serif" }}>
      {/* Header Section */}
      <h1 style={{ color: "#6aa84f", fontSize: "3rem" }}>Welcome to OceanEyes</h1>
      <p style={{ fontSize: "1.2rem", color: "#555", margin: "0 10%" }}>
        Your companion for mental wellness and growth. Connect with therapists, explore helpful resources, and take steps towards a better you.
      </p>

      {/* Navigation Buttons */}
      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => navigate("/MeetingPage")}
          style={{
            backgroundColor: "#6aa84f",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Join a Therapy Session
        </button>
        <button
          onClick={() => alert("Feature coming soon!")}
          style={{
            backgroundColor: "#ccc",
            color: "#333",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Explore Resources
        </button>
      </div>
    </div>
  );
};

export default HomePage;
