import React, { useState, useRef } from "react";
const Photos = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const thumbnailBarRef = useRef(null);
    const path = "/images/landing/photo-album/";
    const photos = [
        path + "dog.jpg",
        path + "spring-bunny.jpg",
        path + "utopia.jpg",
        path + "yard-work.jpg"
    ];

    return (
      <div className="photo-album-container">
        <div className="xp-box photo-viewer">
          {selectedPhoto ? (
            <img src={selectedPhoto} alt="Selected"     />
          ) : (
            <span>Select a photo below</span>
          )}
        </div>
        <div className="xp-box thumbnail-bar" ref={thumbnailBarRef}>
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
      </div>
    );
  };

  export default Photos;