import React, { useEffect, useState, forwardRef } from "react";
import DragHandler from "../../elements/drag-handler";
const Draggable = forwardRef(
  (
    {
      children,
      dragHandlerRef,
      initialLeft = 0,
      initialTop = 0,
      initialWidth = 100,
      initialHeight = 100,
      onUpdatePosition = null,
      id = "draggable-div",
    },
    containerRef
  ) => {


    const [position, setPosition] = useState({
      top: initialTop,
      left: initialLeft,
      width: initialWidth,
      height: initialHeight,
    });

    function update(position) {
      setPosition(position);
      if(onUpdatePosition) {
        onUpdatePosition(position);
      }
    }

    useEffect(() => {
      if(dragHandlerRef) new DragHandler(containerRef.current, dragHandlerRef.current, {...position}, update);
    }, [dragHandlerRef]);

    useEffect(() => {
      if (onUpdatePosition) {
        onUpdatePosition(position);
      }
      return () => {
        onUpdatePosition = null;
      }
    }, [position]);

    return (
      <div
        ref={containerRef}
        id={id}
        style={{
          position: "absolute",
          boxSizing: "border-box",
          top: position.top + "px",
          left: position.left + "px",
          width: position.width + "px",
          height:  position.height + "px",
        }}
      >
        {children} 
      </div>
    );
  }
);

export default Draggable;
