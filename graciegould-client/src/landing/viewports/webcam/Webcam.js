import React, { useRef, useEffect, useState } from "react";
const Webcam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        // videoRef.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <div className="xp webcam-container">
      <div className="xp webcam-top-bar-container"></div>
      <div className="xp webcam-video-container">
        <video ref={videoRef} autoPlay></video>
      </div>
      <div className="xp webcam-bottom-bar-container"></div>
    </div>
  );
};

export default Webcam;
