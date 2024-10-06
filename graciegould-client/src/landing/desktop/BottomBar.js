import StartMenu from "./StartMenu";
import Dashboard from "./Dashboard";

function BottomBar () {
    const bottombarHeight = window.screen.height / 20;
    const startMenuWidth = window.screen.width / 5;

    return (
        <div className="xp desktop-bottom-bar"
        style={{
            height: bottombarHeight + "px"  
        }}
    >
        <StartMenu startMenuWidth={startMenuWidth} bottombarHeight={bottombarHeight}/>
        <Dashboard startMenuWidth={startMenuWidth} bottombarHeight={bottombarHeight}/>
    </div>
    )
}

export default BottomBar;