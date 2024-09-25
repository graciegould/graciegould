import Viewport from "./Viewport";
import { useSelector } from 'react-redux';
// import Contact from "./contact/Contact";
import About from "./about/About";
import Photos from "./photos/Photos";
import Webcam from "./webcam/Webcam";
import Snake from "./snake/Snake";
import Draw from "./draw/Draw";
import { useEffect } from "react";
const componentMap = {
    About,
    Draw,
    Snake,
    Photos,
    Webcam
};
function Viewports() {
 const viewports = useSelector(state => state.viewports);

  return (
    <div className="viewports">
        {Object.keys(viewports).map((name) => {
            const Component = componentMap[viewports[name].Component];  
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
