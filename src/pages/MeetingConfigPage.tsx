import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MeetingConfigPage: React.FC = () => {
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedMic, setSelectedMic] = useState<string | null>(null);
  const [selectedCam, setSelectedCam] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state as { name: string };

  useEffect(() => {
    const fetchDevices = async () => {
      const micDevices = await navigator.mediaDevices.enumerateDevices();
      setMicrophones(micDevices.filter((device) => device.kind === "audioinput"));
      setCameras(micDevices.filter((device) => device.kind === "videoinput"));
    };

    fetchDevices();
  }, []);

  const handleStartMeeting = () => {
    // Proceed to the meeting room
    navigate("/MeetingRoomPage", { state: { name, selectedMic, selectedCam } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10vh", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#6aa84f", fontSize: "3rem" }}>Settings</h1>
      <div>
        <h3>Microphone</h3>
        <select
          onChange={(e) => setSelectedMic(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            width: "60%",
            borderRadius: "5px",
          }}
        >
          <option value="">Select a Microphone</option>
          {microphones.map((mic) => (
            <option key={mic.deviceId} value={mic.deviceId}>
              {mic.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h3>Camera</h3>
        <select
          onChange={(e) => setSelectedCam(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            width: "60%",
            borderRadius: "5px",
          }}
        >
          <option value="">Select a Camera</option>
          {cameras.map((cam) => (
            <option key={cam.deviceId} value={cam.deviceId}>
              {cam.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleStartMeeting}
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
          Start Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingConfigPage;
