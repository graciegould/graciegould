import { useEffect, useRef, useState } from "react";
import Sketch from "../../../utils/components/Canvas/p5/Sketch";
import SketchPad from "../../../utils/canvas/p5/sketch-pad";
import XpScrollbar from "../../../utils/components/scrollbars/XpScrollbar";

function Draw() {
  const [selectedTool, setSelectedTool] = useState("pen");
  const p5Ref = useRef(null);
  const sketchPad = new SketchPad();

  useEffect(() => {
    sketchPad.init(p5Ref.current);
    return () => null;
  }, []);

  useEffect(() => {
    p5Ref.current.activeTool = selectedTool;
  }, [selectedTool]);

  return (
    <div className="xp-box draw-container">
      <div className="draw-box-top"></div>
      <div className="draw-box-center">
        <div className="draw-canvas-overlay">
          <XpScrollbar
            vertical={true}
            horizontal={true}
          >
            <Sketch ref={p5Ref} width={800} height={600} />
          </XpScrollbar>
        </div>
      </div>
      <div className="draw-box-left">
        <div className="draw-tools-container">
          {Object.keys(sketchPad.tools).map((tool, index) => (
            <button
              className={
                tool == selectedTool
                  ? "xp-selected draw-tool-btn"
                  : "xp-btn draw-tool-btn"
              }
              key={"draw-tool-" + index}
              onClick={() => setSelectedTool(tool)}
            >
              <img src={`/images/landing/icons/${tool}.png`} alt={tool} className="draw-tool-icon" />
            </button>
          ))}
        </div>
      </div>
      <div className="draw-box-right"></div>
      <div className="draw-box-bottom"></div>
    </div>
  );
}

function Colors() {
  return (
    <div className="xp-box draw-colors-container">

    </div>
  );
}
export default Draw;
