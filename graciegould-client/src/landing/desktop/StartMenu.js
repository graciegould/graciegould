import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../store/reducers/viewportsReducer";

import XpScrollbar from '../../utils/components/scrollbars/XpScrollbar';
function StartMenu() {
    const viewports = useSelector((state) => state.viewports);
    const dispatch = useDispatch();
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    const startMenuWidth = window.screen.width / 5;
    const openViewport = () => {

    }
    return (
        <div class="desktop-start-menu" style={{ width: startMenuWidth + "px" }}>
            <div
                class="xp-btn desktop-start-menu-btn"
                onClick={() => setStartMenuOpen(!startMenuOpen)}
            >
            </div>

            <div className="xp-box desktop-start-menu-contents-container" style={{
                width: startMenuWidth + "px",
                height: window.screen.height / 3 + "px",
                display: startMenuOpen ? "block" : "none"
            }}>

                <div className="desktop-start-menu-contents">
                    <div className='desktop-start-menu-items'>
                        {Object.keys(viewports).map((name, index) => {
                            const viewport = viewports[name];
                            return (
                                <div
                                    name={name}
                                    key={"start-menu-viewport-" + index}
                                    className="xp-btn desktop-start-menu-item"
                                    style={{ height: window.screen.height / 20 + "px" }}
                                    onClick={() => dispatch(update({ name, hidden: false }))}
                                >
                                   {name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartMenu;