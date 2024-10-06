function Clouds() {
    let cloudData = [];
    let cloudResolution = 5;
    let cloudSpeed = 0.001;
    let noiseOffset = 0;
    let cols = 100;
    let rows = 100;

    const init = (p) => {
        for (let x = 0; x < p.width / cloudResolution; x++) {
            cloudData[x] = [];
            for (let y = 0; y < p.height / cloudResolution; y++) {
                cloudData[x][y] = p.noise(x * 0.1, y * 0.1);
            }
        }
    }
    const drawClouds = (p) => {
        p.noStroke();
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                let noiseValue = p.noise(x * 0.1 + noiseOffset, y * 0.1 + noiseOffset);
                let cloudColor = p.lerpColor(p.color(255, 255, 255), p.color(200, 200, 255), noiseValue); // Cloud color shift
                p.fill(cloudColor);
                p.rect(x * cloudResolution, y * cloudResolution, cloudResolution, cloudResolution);  // Draw pixelated cloud
            }
        }
        noiseOffset += cloudSpeed;
    };

    const start = (p5) => {
        init();
        p5.draw = (p) => drawClouds(p);
        p5.loop();
    };

    const stop = (p5) => {
        cloudData = [];
        cloudResolution = 5;
        cloudSpeed = 0.001;
        noiseOffset = 0;
        p5.clear();
        p5.draw = null;
        p5.noLoop();
    };


    return {
        start,
        stop
    };
}


export default Clouds;