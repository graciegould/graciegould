import { useState, useRef } from "react";
import XpScrollbar from "../scrollbars/XpScrollbar";
function XpMenu({
    width = 100,
    height = 100,
    menuBtnHeight = 30,
    menuItemHeight = 30,
    menuName = "Menu",
    items = []
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuBtnRef = useRef(null);
    return (
        <div className="xp-menu-container" style={{
            width: width,
            height: height
        }}>
            <div className="xp-menu-items-container" style={{
                height: height + "px",
                bottom: menuOpen ? menuBtnHeight + "px" : -height + "px",
            }}>
                <XpScrollbar>
                    <div className="xp-menu-items">
                        {items.map((item, index) => {
                            return (
                                <div
                                    key={"menu-item-" + index}
                                    className="xp-btn xp-menu-item"
                                    style={{
                                        height: menuItemHeight + "px"
                                    }}
                                    onClick={item.onClick}
                                >
                                    {item.label}
                                </div>
                            );
                        }
                        )}
                    </div>
                </XpScrollbar>
            </div>
            <button className="xp-btn xp-menu-btn" ref={menuBtnRef}
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    height: menuBtnHeight + "px",
                    width: width + "px"
                }}
            >
                {menuName}
            </button>
        </div>
    );
}

export default XpMenu;