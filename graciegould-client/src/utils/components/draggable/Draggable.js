import React, { useEffect, useRef, useState } from 'react';

const Draggable = ({ 
    children, 
    dragHandlerRef, 
    initialLeft = 0, 
    initialTop = 0,
    updatedPosition = { top: initialTop, left: initialLeft },
    onUpdatePosition = null
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ top: initialTop, left: initialLeft });

  useEffect(() => {
    const element = containerRef.current;
    const dragHandler = dragHandlerRef.current;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      setPosition((prevPos) => ({
        top: prevPos.top - pos2,
        left: prevPos.left - pos1,
      }));
      if(onUpdatePosition) {
        onUpdatePosition({
          top: position.top - pos2,
          left: position.left - pos1
        });
      }
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      document.body.style.cursor = 'grab'; // Add this line

    };

    dragHandler.onmousedown = dragMouseDown;

    return () => {
      dragHandler.onmousedown = null;
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }, [dragHandlerRef]);

  useEffect(() => {
    setPosition(updatedPosition);
  }, [updatedPosition]);
  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: position.top + 'px',
        left: position.left + 'px',
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
