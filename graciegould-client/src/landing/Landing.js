import Viewport from "./Viewport";
import { useSelector } from 'react-redux';
function Landing() {
 const viewports = useSelector(state => state.viewports);
  return (
    <div className="landing__container">
        {Object.keys(viewports).map((name) => {
            return (
                <Viewport key={"viewport-" + name} name={name}>
                    
                </Viewport>
            );  
        })};
    </div>
  );
}

export default Landing;
