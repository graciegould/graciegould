import p5 from "p5";
import tinycolor from "tinycolor2";

function SketchPad() {
  let p = new p5();
  p.activeTool = "pen";
  let drawing = false;
  let c = tinycolor("rgba(0,0,0,1)");
  let thickness = 10;
  const pressure = () => {
    return p.map(distance(), 0, 50, 1, 0, true);
  };

  const distance = () => p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

  const jitter = (val = 1) => {
    let jitterAmount = p.map(distance(), 0, 50, 1, 0.1, true);
    jitterAmount *= val;
    return p.random(-jitterAmount, jitterAmount);
  }
  let tools = {
    pen: {
      handler: () => {
        p.strokeWeight(thickness);
        p.stroke(c._r, c._g, c._b);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      },
    },
    pencil: {
      handler: () => {
        const linesCount = 30;
        const steps = Math.ceil(distance() / 5);
        for (let i = 0; i <= steps; i++) {
          const lerpX = p.lerp(p.pmouseX, p.mouseX, i / steps);
          const lerpY = p.lerp(p.pmouseY, p.mouseY, i / steps);
          for (let j = 0; j < linesCount; j++) {
            p.strokeWeight(p.random(0.5, thickness * (1 + pressure())));
            p.stroke(
              c._r,
              c._g,
              c._b,
              p.map(pressure(), 0, 1, 50, 200) / 30
            );

            const prevLerpX = p.lerp(p.pmouseX, p.mouseX, (i - 1) / steps);
            const prevLerpY = p.lerp(p.pmouseY, p.mouseY, (i - 1) / steps);

            p.line(
              prevLerpX + jitter(),
              prevLerpY + jitter(),
              lerpX + jitter(),
              lerpY + jitter()
            );
          }
        }
      },
    },
    brush: {
        handler: () => {
            p.noStroke();
            for (let i = 0; i < 1 * thickness; i++) {    
                let opacity = 100 / i;
                p.fill(c._r, c._g, c._b, opacity);
                p.strokeWeight(i);
                p.ellipse(p.pmouseX, p.pmouseY, i,i);
                p.ellipse(p.mouseX, p.mouseY, i,i);
                for (let j = 0; j < 1 * 500; j++) {      
                    p.fill(c._r, c._g, c._b, opacity);
                    p.stroke(c._r, c._g, c._b, opacity);
                    p.strokeWeight(1);
                    p.point(p.randomGaussian(p.mouseX, i), p.randomGaussian(p.mouseY, i));
                }
              }
        },
      },
    eraser: {
      handler: () => {
        p.strokeWeight(tools.eraser.strokeWeight);
        p.stroke(255);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      },
    },
  };

  const mouseDragged = () => {
    if (p.activeTool) {
      tools[p.activeTool].handler();
    }
  };

  const init = (p5) => {
    p = p5;
    p.background(255, 255, 255);
    p.mouseDragged = mouseDragged;
  };

  return {
    init,
    tools,
  };
}

export default SketchPad;
