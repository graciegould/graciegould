import React, { useState, useRef } from "react";

import Draggable from "../../utils/components/draggable/Draggable";

function Icon({
    icon,
    initialTop = 0,
    initialLeft = 0,
    position = { top: initialTop, left: initialLeft },
}) {
    const dragHandlerRef = useRef(null);
  return (
    <Draggable
      ref={dragHandlerRef}
      dragHandlerRef={dragHandlerRef}
      initialTop={initialTop}
      initialLeft={initialLeft}
    >
      <div className="icon" ref={dragHandlerRef}>icon</div>
    </Draggable>
  );
}

export default Icon;
