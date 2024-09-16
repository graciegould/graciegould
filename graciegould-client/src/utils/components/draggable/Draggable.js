import React, { useEffect, useRef, useState } from 'react';

const Draggable = ({ children, dragHandlerRef }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = containerRef.current;
    const dragHandler = dragHandlerRef.current;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (element && dragHandler) {
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
          x: prevPos.x - pos1,
          y: prevPos.y - pos2,
        }));
      };

      const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };

      dragHandler.onmousedown = dragMouseDown;
    }
  }, [dragHandlerRef]);

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
