import React, { useRef, useEffect, useState } from "react";
import XpMenu from "../../../utils/components/menu/XpMenu";
import Canvas from "./Canvas";
import XpScrollbar from "../../../utils/components/scrollbars/XpScrollbar";

const Webcam = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [accessGranted, setAccessGranted] = useState(false);
  const [filter, setFilter] = useState("none");

  const canvasRef = useRef(null);
  const filters = {
    none: {
      label: "No Filter",
      onClick: () => setFilter("none"),
    },
    invert: {
      label: "Invert",
      onClick: () => setFilter("invert"),
    },
    grayscale: {
      label: "Grayscale",
      onClick: () => setFilter("grayscale"),
    },
    sepia: {
      label: "Sepia",
      onClick: () => setFilter("sepia"),
    },
    brightness: {
      label: "Brightness",
      onClick: () => setFilter("brightness"),
    },
    contrast: {
      label: "Contrast",
      onClick: () => setFilter("contrast"),
    },
    saturate: {
      label: "Saturate",
      onClick: () => setFilter("saturate"),
    },
    hueRotate: {
      label: "Hue Rotate",
      onClick: () => setFilter("hueRotate"),
    },
    pizzazz: {
      label: "Pizzazz",
      onClick: () => setFilter("pizzazz"),
    },
    posterize: {
      label: "Posterize",
      onClick: () => setFilter("posterize"),
    },
    film: {
      label: "Film",
      onClick: () => setFilter("film"),
    },
    light: {
      label: "Light",
      onClick: () => setFilter("light"),
    },
    pastel: {
      label: "Pastel",
      onClick: () => setFilter("pastel"),
    },
    videoGame: {
      label: "Video Game",
      onClick: () => setFilter("videoGame"),
    },
    distort: {
      label: "Distort",
      onClick: () => setFilter("distort"),
    }
  }
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        setAccessGranted(true);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setAccessGranted(false);
      }
    };
    startWebcam();
  }, []);



  return (
    <div className="xp webcam-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="xp webcam-top-bar-container">
      </div>
      <div className="xp webcam-video-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {accessGranted ? 
          <Canvas 
            videoStream={videoStream} 
            filter={filter} 
            ref={canvasRef} 
          /> : <div className="xp webcam-access-denied">
                Cannot access webcam.
                </div>
              }
        <div className="webcam-menu">
          <XpMenu menuName={"Filters"} items={Object.values(filters)} />
        </div>
      </div>
      <div className="xp webcam-bottom-bar-container">
      </div>
      {/* <BottomBar canvasRef={canvasRef}/> */}
    </div>
  );
};

function BottomBar({
  canvasRef
}) {
  const [photos, setPhotos] = useState([]);

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const photo = canvas.toDataURL("image/png");
    setPhotos([...photos, photo]);
  }
  return (
    <div className="xp webcam-bottom-bar-container">
      <div className="webcam-bottom-bar-top">
        <button 
          className="xp-btn webcam-camera-button"
          onClick={takePhoto}
        >
          take photo
        </button>
      </div>
      <div className="webcam-thumbnail-container">
        {photos.map((photo, index) => (
          <div 
            key={"webcam-photo"-index} 
            className="xp webcam-thumbnail-item"
          >
              <img src={photo} alt="webcam-thumbnail" />
            </div>
        ))}
      </div>
    </div>
  );
}

export default Webcam;
