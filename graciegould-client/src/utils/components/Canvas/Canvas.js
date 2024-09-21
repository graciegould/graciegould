import React, { forwardRef, useEffect, useRef } from "react";

const Canvas = forwardRef(({ 
    width, 
    height, 
    className ="canvas",
    ...props 
    }, canvasRef) => {
    useEffect(() => {
        console.log(canvasRef);
        // const canvas = canvasRef.current;
        // const context = canvas.getContext("2d");
        // // Use the context to draw on the canvas
        // // Example: context.fillRect(0, 0, width, height);
    }, [canvasRef, width, height]);

    return <canvas className={className} ref={canvasRef} width={width} height={height} {...props} />;
});

export default Canvas;
