import Maze from "./art/maze";
import Clouds from "./art/clouds";
function Generator() {
    let p5, canvas, context;
    const generators = {
      maze : Maze,
      clouds: Clouds,
    };
    let active = null;
    
    const init = (p5Instance) => {
        p5 = p5Instance;
        canvas = p5.canvas;
        context = p5.drawingContext;
        console.log("init", p5);
    };

    const start = (display) => {
        console.log("active", active)
        if(p5) {
            p5.clear();
            active = display;
            console.log("active", active);
            if(active) {
                console.log("stopping generator", active);
                generators[active](p5).stop();
            }
            active = display;
            generators[active](p5).start(p5);
        }
    };
  
    return {
    init,
      generators,
      start,
    };
  }
  
  export default Generator;