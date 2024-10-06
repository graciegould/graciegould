import { useEffect, useState, useRef } from "react";
import XpMenu from "../../../utils/components/menu/XpMenu";
import Sketch from "../../../utils/components/Canvas/p5/Sketch";
import Maze from "./art/maze";
import Clouds from "./art/clouds";


function Generative() {
  const [display, setDisplay] = useState();
  const p5Ref = useRef(null);
  const maze = new Maze();
  const clouds = new Clouds();
  const generators = {
    maze: {
      label: "Maze",
      onClick: () => {
        setDisplay(maze);
      }
    },
    clouse: {
      label: "Clouds",
      onClick: () =>{ 
        display.stop();
        setDisplay(clouds)
      }
    }
  };

  useEffect(() => {
    if(!p5Ref.current) return;
    setDisplay(Maze(p5Ref.current));
    // display.start();
  },[]);

  useEffect(() => {
    if(display) {
      display.start();
    }
  }, [display]);
  return (
    <div className="generative-container">
      <div className="generative-menu-container">
        <XpMenu items={Object.values(generators)} />
      </div>
      <Sketch 
        width={500}
        height={500}
        ref={p5Ref}
      />
    </div>
  );
}

export default Generative;