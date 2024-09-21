import { useRef } from "react";
import Canvas from "../../../utils/components/Canvas/Canvas";
import XpScrollbar from "../../../utils/components/scrollbars/XpScrollbar";
function Draw() {
  const canvasRef = useRef(null);
  const scrollbarRef = useRef(null);
  return (
    <div className="xp-box draw-container">
      <div className="draw-box-top"></div>
      <XpScrollbar
        ref={scrollbarRef}
        className="draw-box-center"
        vertical={true}
        horizontal={true}
      >
        <div className="draw-canvas-overlay">
          <Canvas ref={canvasRef} width={800} height={600} />
        </div>
      </XpScrollbar>
      <div className="draw-box-left"></div>
      <div className="draw-box-right"></div>
      <div className="draw-box-bottom"></div>
    </div>
  );
}

export default Draw;
