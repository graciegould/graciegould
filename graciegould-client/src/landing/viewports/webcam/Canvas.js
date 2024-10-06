import React, { useEffect, useRef, forwardRef } from 'react';
const Canvas = forwardRef(
    (
        {
            videoStream,
            filter
        },
        canvasRef
    ) => {
        const filterRef = useRef(filter);

        useEffect(() => {
            filterRef.current = filter;
        }, [filter]);

        const filters = {
            none: (imageData) => {
                return imageData;
            },
            invert: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    pixels[i] = 255 - pixels[i];       // Red
                    pixels[i + 1] = 255 - pixels[i + 1]; // Green
                    pixels[i + 2] = 255 - pixels[i + 2]; // Blue
                }
                return imageData;
            },
            grayscale: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                    pixels[i] = avg;       // Red
                    pixels[i + 1] = avg; // Green
                    pixels[i + 2] = avg; // Blue
                }
                return imageData;
            },
            sepia: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);       // Red
                    pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // Green
                    pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // Blue
                }
                return imageData;
            },
            brightness: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    pixels[i] += 50;       // Red
                    pixels[i + 1] += 50; // Green
                    pixels[i + 2] += 50; // Blue
                }
                return imageData;
            },
            contrast: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    pixels[i] = pixels[i] * 1.2;       // Red
                    pixels[i + 1] = pixels[i + 1] * 1.2; // Green
                    pixels[i + 2] = pixels[i + 2] * 1.2; // Blue
                }
                return imageData;
            },
            saturate: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const avg = (r + g + b) / 3;
                    pixels[i] = r + (r - avg) * 0.5;       // Red
                    pixels[i + 1] = g + (g - avg) * 0.5; // Green
                    pixels[i + 2] = b + (b - avg) * 0.5; // Blue
                }
                return imageData;
            },
            hueRotate: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const avg = (r + g + b) / 3;
                    pixels[i] = r + (r - avg) * 0.5;       // Red
                    pixels[i + 1] = g + (g - avg) * 0.5; // Green
                    pixels[i + 2] = b + (b - avg) * 0.5; // Blue
                }
                return imageData;
            },

            pizzazz: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    pixels[i] = r + (r - g) + (r - b);       // Red
                    pixels[i + 1] = g + (g - r) + (g - b); // Green
                    pixels[i + 2] = b + (b - r) + (b - g); // Blue
                }
                return imageData;
            },
            posterize: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    pixels[i] = pixels[i] - pixels[i] % 32;       // Red
                    pixels[i + 1] = pixels[i + 1] - pixels[i + 1] % 32; // Green
                    pixels[i + 2] = pixels[i + 2] - pixels[i + 2] % 32; // Blue
                }
                return imageData;
            },
            film: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    pixels[i] = pixels[i] + 50;       // Red
                    pixels[i + 1] = pixels[i + 1] - 50; // Green
                    pixels[i + 2] = pixels[i + 2] - 50; // Blue
                }
                return imageData;
            },
            light: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    pixels[i] = pixels[i] + 50;       // Red
                    pixels[i + 1] = pixels[i + 1] + 50; // Green
                    pixels[i + 2] = pixels[i + 2] + 50; // Blue
                }
                return imageData;
            },
            pastel: (imageData) => {
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    // Increase brightness
                    pixels[i] = Math.min(pixels[i] + 100, 255);       // Red
                    pixels[i + 1] = Math.min(pixels[i + 1] + 100, 255); // Green
                    pixels[i + 2] = Math.min(pixels[i + 2] + 100, 255); // Blue

                    // Reduce saturation
                    const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                    pixels[i] = avg + (pixels[i] - avg) * 0.5;
                    pixels[i + 1] = avg + (pixels[i + 1] - avg) * 0.5;
                    pixels[i + 2] = avg + (pixels[i + 2] - avg) * 0.5;

                    // Reduce contrast
                    pixels[i] = pixels[i] * 0.8;
                    pixels[i + 1] = pixels[i + 1] * 0.8;
                    pixels[i + 2] = pixels[i + 2] * 0.8;

                    // Add a slight blue tint
                    pixels[i + 2] = Math.min(pixels[i + 2] + 50, 255);

                    // make the image look like a painting
                    pixels[i] = pixels[i] - pixels[i] % 32;
                    pixels[i + 1] = pixels[i + 1] - pixels[i + 1] % 32;
                    pixels[i + 2] = pixels[i + 2] - pixels[i + 2] % 32;
                    // add pink tint
                    pixels[i] = Math.min(pixels[i] + 50, 255);
                    pixels[i + 1] = Math.min(pixels[i + 1] + 50, 255);
                    pixels[i + 2] = Math.min(pixels[i + 2] + 50, 255);
                }
                return imageData;
            },
            videoGame: (imageData) => {
                const pixels = imageData.data;
                const width = imageData.width;
                const height = imageData.height;
                const pixelSize = 8; // Size of the pixelation effect

                // Apply pixelation effect
                for (let y = 0; y < height; y += pixelSize) {
                    for (let x = 0; x < width; x += pixelSize) {
                        // Get the average color of the pixel block
                        let r = 0, g = 0, b = 0, count = 0;
                        for (let dy = 0; dy < pixelSize; dy++) {
                            for (let dx = 0; dx < pixelSize; dx++) {
                                const px = (y + dy) * width + (x + dx);
                                r += pixels[px * 4];
                                g += pixels[px * 4 + 1];
                                b += pixels[px * 4 + 2];
                                count++;
                            }
                        }
                        r = Math.floor(r / count);
                        g = Math.floor(g / count);
                        b = Math.floor(b / count);

                        // Quantize the colors to a limited palette
                        r = Math.floor(r / 64) * 64;
                        g = Math.floor(g / 64) * 64;
                        b = Math.floor(b / 64) * 64;

                        // Apply the average color to the pixel block
                        for (let dy = 0; dy < pixelSize; dy++) {
                            for (let dx = 0; dx < pixelSize; dx++) {
                                const px = (y + dy) * width + (x + dx);
                                pixels[px * 4] = r;
                                pixels[px * 4 + 1] = g;
                                pixels[px * 4 + 2] = b;
                            }
                        }
                    }
                }
                return imageData;
            },
            distort: (imageData) => {
                const pixels = imageData.data;
                const width = imageData.width;
                const height = imageData.height;
                const frequency = 0.05; // Frequency of the sine wave
                const amplitude = 20; // Amplitude of the sine wave

                const newPixels = new Uint8ClampedArray(pixels.length);

                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        // Calculate the displacement
                        const displacement = Math.sin(y * frequency) * amplitude;
                        let newX = Math.floor(x + displacement);

                        // Wrap around the x-coordinate if it goes out of bounds
                        if (newX < 0) {
                            newX = width + newX;
                        } else if (newX >= width) {
                            newX = newX - width;
                        }

                        const oldIndex = (y * width + x) * 4;
                        const newIndex = (y * width + newX) * 4;

                        newPixels[newIndex] = pixels[oldIndex];
                        newPixels[newIndex + 1] = pixels[oldIndex + 1];
                        newPixels[newIndex + 2] = pixels[oldIndex + 2];
                        newPixels[newIndex + 3] = pixels[oldIndex + 3];
                    }
                }

                // Copy the new pixels back to the original imageData
                for (let i = 0; i < pixels.length; i++) {
                    pixels[i] = newPixels[i];
                }

                return imageData;
            },
            wavy: (imageData) => {
                const pixels = imageData.data;
                const width = imageData.width;
                const height = imageData.height;
                const pixelSize = 8; // Size of the pixelation effect

                // Apply pixelation effect
                for (let y = 0; y < height; y += pixelSize) {
                    for (let x = 0; x < width; x += pixelSize) {
                        // Get the average color of the pixel block
                        let r = 0, g = 0, b = 0, count = 0;
                        for (let dy = 0; dy < pixelSize; dy++) {
                            for (let dx = 0; dx < pixelSize; dx++) {
                                const px = (y + dy) * width + (x + dx);
                                r += pixels[px * 4];
                                g += pixels[px * 4 + 1];
                                b += pixels[px * 4 + 2];
                                count++;
                            }
                        }
                        r = Math.floor(r / count);
                        g = Math.floor(g / count);
                        b = Math.floor(b / count);

                        // Quantize the colors to a limited palette
                        r = Math.floor(r / 64) * 64;
                        g = Math.floor(g / 64) * 64;
                        b = Math.floor(b / 64) * 64;

                        // Apply the average color to the pixel block
                        for (let dy = 0; dy < pixelSize; dy++) {
                            for (let dx = 0; dx < pixelSize; dx++) {
                                const px = (y + dy) * width + (x + dx);
                                pixels[px * 4] = r;
                                pixels[px * 4 + 1] = g;
                                pixels[px * 4 + 2] = b;
                            }
                        }
                    }
                }
                return imageData;
            },

        }
        useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            let videoElement = document.createElement("video");

            if (videoStream) {
                videoElement.srcObject = videoStream;
                videoElement.play();

                videoElement.onloadedmetadata = () => {
                    drawVideoToCanvas();
                };

                const drawVideoToCanvas = () => {
                    const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
                    const resizeCanvas = () => {
                        const container = canvas.parentElement;
                        const containerWidth = container.clientWidth;
                        const containerHeight = container.clientHeight;
                        let canvasWidth, canvasHeight;
                        if (containerWidth / containerHeight > videoAspectRatio) {
                            canvasHeight = containerHeight;
                            canvasWidth = containerHeight * videoAspectRatio;
                        } else {
                            canvasWidth = containerWidth;
                            canvasHeight = containerWidth / videoAspectRatio;
                        }
                        canvas.width = canvasWidth;
                        canvas.height = canvasHeight;
                    };

                    const renderFrame = () => {
                        resizeCanvas();
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        context.putImageData(filters[filterRef.current](imageData), 0, 0);
                        requestAnimationFrame(renderFrame);
                    };
                    renderFrame();
                };
            }

            return () => {
                if (videoElement) {
                    videoElement.pause();
                    videoElement.srcObject = null;
                }
                if (videoStream) {
                    videoStream.getTracks().forEach(track => track.stop());
                }
            };
        }, [videoStream])

        return (
            <div className="webcam-canvas-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
                <canvas className="webcam-canvas" id="webcam-canvas" ref={canvasRef} />
            </div>
        );
    });

export default Canvas;
