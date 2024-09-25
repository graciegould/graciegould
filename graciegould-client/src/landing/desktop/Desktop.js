import Viewports from "../viewports/Viewports";
import Icons from "../icons/Icons";
import StartMenu from "./StartMenu";
import XpScrollbar from "../../utils/components/scrollbars/XpScrollbar";
function Desktop() {
    const topbarHeight = window.screen.height / 30;
    const bottombarHeight = window.screen.height / 20;
    return (
        <div className="desktop-container">
            <Viewports />
            <div className="xp desktop-top-bar" style={{
                height: topbarHeight + "px"
            }}></div>
            <div className="desktop-center"
                style={{
                    top: topbarHeight + "px",
                    bottom: bottombarHeight + "px"
                }}
            >
                <Icons />
            </div>
            <div className="xp desktop-bottom-bar"
                style={{
                    height: bottombarHeight + "px"
                }}
            >
                <StartMenu />
            </div>
        </div>
    )
}


export default Desktop;     