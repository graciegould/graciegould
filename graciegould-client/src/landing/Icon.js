import React, { useState, useRef } from "react";

import Draggable from "../utils/components/draggable/Draggable";

function Icon({
    initialTop = 0,
    initialLeft = 0,
    position = { top: initialTop, left: initialLeft },
}) {
    const dragHandlerRef = useRef(null);
  return (
    <Draggable
      dragHandlerRef={dragHandlerRef}
      initialTop={initialTop}
      initialLeft={initialLeft}
      updatedPosition={position}
    >
      <div className="icon" ref={dragHandlerRef}>icon</div>
    </Draggable>
  );
}

export default Icon;
