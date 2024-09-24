import Resizable from "../../utils/components/resizable/Resizable";
import XpButton from "../../utils/components/buttons/XpButton";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/viewportsReducer";
import { useSelector } from "react-redux";
import { pixelsToPercentage, percentageToPixels} from "../../utils/elements/units";

function Viewport({ children, name }) {
  const viewport = useSelector((state) => state.viewports[name]);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
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
      top: percentageToPixels(10, "top"),
      left: percentageToPixels(10, "left"),
      width: percentageToPixels(80, "width"),
      height: percentageToPixels(80, "height"),
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
      maxWidth={viewport.bounds?.maxWidth}
      maxHeight={viewport.bounds?.maxHeight}
      minWidth={viewport.bounds?.minWidth}
      minHeight={viewport.bounds?.minHeight}
      onUpdateSize={(bounds) => dispatch(update({ name, bounds }))}
      ref={containerRef}
      unit="%"
      dragHandlerRef={dragHandlerRef}
      className={`viewport-${name}`}
    >
      <div className="xp-box viewport-top-bar">
        <div className="viewport-btn__container">
          <XpButton onClick={handleExit}>X</XpButton>
        </div>
        <div className="viewport-btn__container">
          <XpButton onClick={handleMinimize}>-</XpButton>
        </div>
        <div className="viewport-btn__container">
          <XpButton onClick={handleMaximize}>[]</XpButton>
        </div>
        <div className="xp-box viewport-drag-handler" ref={dragHandlerRef}>
          {name}
        </div>
      </div>
      <div className="viewport-body">
        <Bounds viewport={viewport} />
      {children}
      </div>
    </Resizable>
  );
}


function Bounds({viewport}) {
  return (
    <div style={{
      position: "absolute",
      top: "10px",
      left: "10px",
      color: "white",
      fontSize: "12px",
      zIndex: 1000,
    }}>
      <div>
        WIDTH: {pixelsToPercentage(viewport.bounds.width, "width")}
      </div>
      <div>
        HEIGHT: {pixelsToPercentage(viewport.bounds.height, "height")}
      </div>
      <div>
        TOP: {pixelsToPercentage(viewport.bounds.top, "top")}
      </div>
      <div>
        LEFT: {pixelsToPercentage(viewport.bounds.left, "left")}
      </div>
  </div>
  )
}
export default Viewport;
