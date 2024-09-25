import Viewports from "./viewports/Viewports";
function Desktop() {
    return (
        <div class="desktop-container">
            <div class="xp-box desktop-center">
                <Viewports />
            </div>
            <div class="xp-box desktop-top-bar"></div>
            <div class="xp-box desktop-bottom-bar"></div>
        </div>
    )
}

export default Desktop;     