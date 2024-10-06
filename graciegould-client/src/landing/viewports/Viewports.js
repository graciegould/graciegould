import Viewport from "./Viewport";
import { useSelector } from 'react-redux';
import About from "./about/About";
import Photos from "./photos/Photos";
import Webcam from "./webcam/Webcam";
import Snake from "./snake/Snake";
import { useEffect, useRef, useState } from "react";
const componentMap = {
    About,
    Snake,
    Photos,
    // Webcam
};

function Viewports() {
    const viewports = useSelector(state => state.viewports);
    const viewportsContainer = useRef(null);
    return (
        <div className="viewports" ref={viewportsContainer}>
            {Object.keys(viewports).map((name) => {
                const Component = componentMap[viewports[name].Component];
                if(viewports[name].hidden) return null;
                return (
                    <Viewport key={"viewport-" + name} name={name}>
                        <Component />
                    </Viewport>
                );
            })};
        </div>
    );
}

export default Viewports;
