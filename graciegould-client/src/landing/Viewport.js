import Resizable from "../utils/components/resizable/Resizable";
import RbButton from "../utils/components/buttons/RbButton";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { update } from "../app/viewportsReducer";
import { useSelector } from "react-redux";
import { percentageToPixels } from "../utils/elements/units";

function Viewport({ children, name }) {
  const viewport = useSelector((state) => state.viewports[name]);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const resizableRef = useRef(null);
  const dragHandlerRef = useRef(null);

  const handleExit = () => {
    dispatch(update({ name: name, hidden: true }));
    containerRef.current.style.display = "none";
  };

  const handleMinimize = () => {
    const bounds = {
      top: 100,
      left: 100,
      width: 350,
      height: 200,
    };
    Object.keys(bounds).forEach((key) => {
      containerRef.current.style[key] = bounds[key] + "px";
    });
    dispatch(update({ name, bounds }));
  };

  const handleMaximize = () => {
    const bounds = {
      top: percentageToPixels(10, window.innerHeight),
      left: percentageToPixels(10, window.innerWidth),
      width: percentageToPixels(80, window.innerWidth),
      height: percentageToPixels(80, window.innerHeight),
    };
    Object.keys(bounds).forEach((key) => {
      containerRef.current.style[key] = bounds[key] + "px";
    });
    dispatch(update({ name, bounds }));
  };

  return (
    <Resizable
      initialTop={viewport.bounds.top}
      initialLeft={viewport.bounds.left}
      initialWidth={viewport.bounds.width}
      initialHeight={viewport.bounds.height}
      onUpdateSize={(bounds) => dispatch(update({ name, bounds }))}
      ref={containerRef}
      dragHandlerRef={dragHandlerRef}
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
          name
        </div>
      </div>
      {children}
    </Resizable>
  );
}

export default Viewport;
