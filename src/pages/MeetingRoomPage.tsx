/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const MeetingRoomPage: React.FC = () => {
  const { name, selectedMic, selectedCam } = useLocation().state as {
    name: string;
    selectedMic: string | null;
    selectedCam: string | null;
  };
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // This is where the Chime SDK integration will go for audio and video setup
    // For now, we assume you have already set up video/audio streams
    if (videoRef.current) {
      // Simulate joining a video call (you'll replace this with Chime SDK)
      videoRef.current.srcObject = new MediaStream();
    }
  }, []);

  const handleMute = () => {
    // Toggle mute functionality
  };

  const handleVideo = () => {
    // Toggle video functionality
  };

  const handleLeave = () => {
    // End the call
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#6aa84f", fontSize: "3rem" }}>Welcome, {name}</h1>
      <div style={{ marginTop: "2rem" }}>
        <video ref={videoRef} autoPlay muted style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }} />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleMute} style={{ backgroundColor: "#ccc", padding: "10px 20px" }}>
          Mute
        </button>
        <button onClick={handleVideo} style={{ backgroundColor: "#ccc", padding: "10px 20px", marginLeft: "10px" }}>
          Video Off
        </button>
        <button onClick={handleLeave} style={{ backgroundColor: "#ff6666", padding: "10px 20px", marginLeft: "10px" }}>
          Leave Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingRoomPage;
