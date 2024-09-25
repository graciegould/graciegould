import React, { useState, useRef, useEffect } from "react";
import XpScrollbar from "../../../utils/components/scrollbars/XpScrollbar";
const Photos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const thumbnailImagesRef = useRef(null);
  const path = "/images/landing/photo-album/";
  const photos = [
    path + "dog.jpg",
    path + "spring-bunny.jpg",
    path + "utopia.jpg",
    path + "yard-work.jpg",
    path + "dog.jpg",
    path + "spring-bunny.jpg",
    path + "utopia.jpg",
    path + "yard-work.jpg",
    path + "dog.jpg",
    path + "spring-bunny.jpg",
    path + "utopia.jpg",
    path + "yard-work.jpg",
    path + "dog.jpg",
    path + "spring-bunny.jpg",
    path + "utopia.jpg",
    path + "yard-work.jpg",
  ];

  useEffect(() => {

  }, [selectedPhoto]);
  return (
    <div className="photos-container">
      <div className="photo-viewer">
        <img className="photo-viewer-image" src={photos[selectedPhoto]} />  
      </div>
      <div className="xp-scrollbar photo-thumbnail-list">
        <XpScrollbar
          horizontal={true}
          vertical={false}
        >
          <div className="photo-thumbnail-images" ref={thumbnailImagesRef}>
            {photos.map((photo, index) => (
              <div
                className={
                  index == selectedPhoto
                    ? "xp-selected photo-thumbnail-item"
                    : "xp-btn photo-thumbnail-item"
                }
                key={"photo-thumbnail-item-" + index}
                onClick={() => setSelectedPhoto(index)}
              >
                <img
                  key={index}
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className="photo-thumbnail"
                  onClick={() => setSelectedPhoto(photo)}
                />
              </div>
            ))}
          </div>
        </XpScrollbar>
      </div>
    </div>
  );
};

export default Photos;
