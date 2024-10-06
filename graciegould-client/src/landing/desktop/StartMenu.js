import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { show } from "../../store/reducers/viewportsReducer";

import XpScrollbar from '../../utils/components/scrollbars/XpScrollbar';
function StartMenu({startMenuWidth, bottomBarHeight}) {
    const viewports = useSelector((state) => state.viewports);
    const dispatch = useDispatch();
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const startMenuRef = useRef(null);
    useEffect(() => {
        document.querySelector('.desktop-center').addEventListener('click', () => {
            setStartMenuOpen(true);
        });
    }, []);
    return (
        <div className="xp desktop-start-menu" style={{ width: startMenuWidth + "px" }}>
            <div
                className="xp-btn desktop-start-menu-btn"
                onClick={() => setStartMenuOpen(!startMenuOpen)}
            >
                Menu
            </div>
            <div className="xp desktop-start-menu-contents-container"
                ref={startMenuRef}
                style={{
                    width: startMenuWidth + "px",
                    bottom: startMenuOpen ? -startMenuRef.current.offsetHeight - 10 + "px" : "100%",
                    height: window.screen.height / 4 + "px"
                }}>
                <XpScrollbar>
                    <div className="desktop-start-menu-items-container">
                        {Object.keys(viewports).map((name, index) => {
                            return (
                                <div
                                    name={name}
                                    key={"start-menu-viewport-" + index}
                                    className="xp-btn desktop-start-menu-item"
                                    style={{ height: bottomBarHeight + "px" }}
                                    onClick={() => dispatch(show({ name }))}
                                >
                                    <div className='desktop-start-menu-item-icon'>
                                        <img src={viewports[name].iconPath} alt={name} />
                                    </div>
                                    <div className='desktop-start-menu-item-label'>
                                        {name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </XpScrollbar>
            </div>
        </div>
    )
}

export default StartMenu;