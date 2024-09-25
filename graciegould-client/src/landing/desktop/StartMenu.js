import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { show } from "../../store/reducers/viewportsReducer";

import XpScrollbar from '../../utils/components/scrollbars/XpScrollbar';
function StartMenu() {
    const viewports = useSelector((state) => state.viewports);
    const dispatch = useDispatch();
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const startMenuWidth = window.screen.width / 5;
    return (
        <div className="desktop-start-menu" style={{ width: startMenuWidth + "px" }}>
            <div
                className="xp-btn desktop-start-menu-btn"
                onClick={() => setStartMenuOpen(!startMenuOpen)}
            >
            </div>
            <div className="xp desktop-start-menu-contents-container" style={{
                width: startMenuWidth + "px",
                height: window.screen.height / 9+ "px",
                display: startMenuOpen ? "block" : "none"
            }}>
                {/* <div className="desktop-start-menu-items-container"> */}

                        {/* {Object.keys(viewports).map((name, index) => {
                            const viewport = viewports[name];
                            return (
                                <div
                                    name={name}
                                    key={"start-menu-viewport-" + index}
                                    className="xp-btn desktop-start-menu-item"
                                    style={{ height: window.screen.height / 20 + "px" }}
                                    onClick={() => dispatch(show({ name }))}
                                >
                                   {name}
                                </div>
                            );
                        })} */}

                {/* </div> */}
            </div>
        </div>
    )
}

export default StartMenu;