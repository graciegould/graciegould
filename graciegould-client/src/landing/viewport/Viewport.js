import Resizable from "../../utils/components/resizable/Resizable";
import Draggable from "../../utils/components/draggable/Draggable";
import RbButton from "../../utils/components/buttons/RbButton";
import React, { useState, useRef } from "react";

function Viewport({
  children,
  initialWidth = 500,
  initialHeight = 500,
  initialLeft = 0,
  initialTop = 0,
}) {
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [position, setPosition] = useState({ 
    top: initialTop, left: initialLeft 
  });
  const dragHandlerRef = useRef(null);

  const handleExit = () => {
    console.log("exit");
  };

  const handleMinimize = () => {
    setSize({ width: 200, height: 25 }); // Minimize height to show only top bar
    setPosition({top: 0, left: 0});
  };

  const handleMaximize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
    setPosition({top: 0, left: 0});
  };

//   const onUpdateSize = (newSize) => {
//     setSize(newSize);
//   };

//   const onUpdatePosition = (newPosition) => {
//     setPosition(newPosition);
//   };
  
  return (
    <Draggable 
        dragHandlerRef={dragHandlerRef}
        initialTop={initialTop}
        initialLeft={initialLeft}
        updatedPosition={position}
        // onUpdatePosition={onUpdatePosition}
    >
      <div className="viewport">
        <Resizable
          initialWidth={size.width}
          initialHeight={size.height}
          initialTop={initialTop}
          initialLeft={initialLeft}
          updatedSize={size}
        //   onUpdateSize={onUpdateSize}
        >
          <div className="viewport-top-bar">
            <div className="viewport-exit-btn__container">
              <RbButton onClick={handleExit}>X</RbButton>
            </div>
            <div className="viewport-minimize-btn__container">
              <RbButton onClick={handleMinimize}>-</RbButton>
            </div>
            <div className="viewport-maximize-btn__container">
              <RbButton onClick={handleMaximize}>[]</RbButton>
            </div>
            <div className="viewport-drag-handler" ref={dragHandlerRef}>
              drag me
            </div>
          </div>
          {children}
        </Resizable>
      </div>
    </Draggable>
  );
}

export default Viewport;
