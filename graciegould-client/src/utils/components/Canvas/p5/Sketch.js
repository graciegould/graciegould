import React, { forwardRef, useEffect, useRef } from "react";
import p5 from "p5";

const Sketch = forwardRef(({ 
    width, 
    height, 
    className ="canvas",
    noLoop = true,
    setup = null,
    ...props 
    }, p5Ref) => {
    const canvasRef = useRef(null);
    const defaultHandlers =  {
        setup: (p) => {
            p.background(255, 255, 255);
            p.createCanvas(width, height);
            p.noLoop();
        },
        draw: (p) => {
            p.background(255, 255, 255);
        },
        mouseClicked: (p) => {},
        mouseDragged: (p) => {},
        mousePressed: (p) => {},
        mouseReleased: (p) => {},
        mouseMoved: (p) => {},
    }
    
    useEffect(() => {
        const Sketch = (p) => {
            p.setup = () => {
                if(setup) {
                    setup(p);
                }else {
                    p.createCanvas(width, height);
                }
            };

        }; 
        p5Ref.current = new p5(Sketch, canvasRef.current);
    }, [width, height]);

    return <div className={className} ref={canvasRef} width={width} height={height} {...props} />;
});

export default Sketch;
