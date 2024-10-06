import Viewports from "../viewports/Viewports";
import Icons from "../icons/Icons";
import Clock from "./Clock";
import BottomBar from "./BottomBar";
import { useRef, useEffect } from "react";
function Desktop() {
    const topbarHeight = window.screen.height / 30;
    const bottombarHeight = window.screen.height / 20;
    return (
        <div className="desktop-container">
            <Viewports />
            <div className="xp desktop-top-bar" style={{
                height: topbarHeight + "px"
            }}>
                <Clock />
            </div>
            <div className="desktop-center"
                style={{
                    top: topbarHeight + "px",
                    bottom: bottombarHeight + "px"
                }}
            >
                <Icons />
            </div>
            <BottomBar />
        </div>
    )
}

 
function Background() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']; // Rainbow colors
        const pixelSize = 10; // Adjust the pixel size for a more pixelated look
        const radius = Math.min(canvas.width, canvas.height) / 2;

        // Function to draw pixelated rainbow
        function drawPixelatedRainbow() {
            for (let i = 0; i < colors.length; i++) {
                ctx.fillStyle = colors[i];
                let currentRadius = radius - (i * (radius / colors.length));

                for (let y = 0; y < canvas.height / 2; y += pixelSize) {
                    for (let x = 0; x < canvas.width; x += pixelSize) {
                        let dist = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height, 2));
                        if (dist > currentRadius - pixelSize && dist < currentRadius) {
                            ctx.fillRect(x, y, pixelSize, pixelSize);
                        }
                    }
                }
            }
        }

        // Draw the rainbow on mount
        drawPixelatedRainbow();

        // Redraw the canvas when window is resized
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawPixelatedRainbow();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup resize event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []); // Empty dependency array to run only on mount

    return (
        <div className="desktop-background">
            <canvas id="desktop-background-canvas" ref={canvasRef}></canvas>
        </div>
    );
}

export default Desktop;     