import Viewports from "../viewports/Viewports";
import StartMenu from "../desktop/StartMenu";
function Desktop() {
    return (
        <div className="desktop-container">
        <Viewports />
            <div className="xp-box desktop-top-bar" style={{
                height: window.screen.height / 30 + "px"
            }}></div>
            <div className="xp-box desktop-bottom-bar"
                style={{
                    height: window.screen.height / 20 + "px"    
                }}
            >
                <StartMenu />
            </div>
        </div>
    )   
}


export default Desktop;     