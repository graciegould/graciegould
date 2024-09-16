import Resizable from "../resizable/Resizable";
import Draggable from "../draggable/Draggable";
import RbButton from "../buttons/RbButton";
import React, { useRef } from "react";

import "./viewport.css";
function Viewport({
  children,
  initialWidth = 500,
  initialHeight = 500,
  initialLeft = 0,
  initialTop = 0
}) {
  const dragHandlerRef = useRef(null);

  const handleExit = () => {
    console.log("exit");
  }
  const handleMinimize = () => {
    console.log("minimize");
  }
  return (
    <Draggable dragHandlerRef={dragHandlerRef}>
      <div className="viewport">
        <Resizable
          initialWidth={initialWidth}
          initialHeight={initialHeight}
          initialTop={initialTop}
          initialLeft={initialLeft}
        >
          <div className="viewport-top-bar">
            <div className="viewport-exit-btn__container">
                <RbButton onClick={handleExit}>
                    X
                </RbButton>
            </div>
            <div className="viewport-minimize-btn__container">
                <RbButton onClick={handleMinimize}>
                    -
                </RbButton>
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
