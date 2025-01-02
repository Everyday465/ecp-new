import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MeetingArrivalPage: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoinMeeting = () => {
    if (name) {
      // Save the name and navigate to settings page
      navigate("/MeetingConfigPage", { state: { name } });
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#6aa84f", fontSize: "3rem" }}>Enter Your Name</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        style={{
          padding: "10px",
          fontSize: "1.2rem",
          marginTop: "1rem",
          width: "60%",
          borderRadius: "5px",
        }}
      />
      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleJoinMeeting}
          style={{
            backgroundColor: "#6aa84f",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingArrivalPage;
