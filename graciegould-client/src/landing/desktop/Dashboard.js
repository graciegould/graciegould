import { useSelector, useDispatch} from 'react-redux';
import {maximize } from "../../store/reducers/viewportsReducer";


function Dashboard({ startMenuWidth, bottomBarHeight }) {
    const viewports = useSelector(state => state.viewports);
    const dispatch = useDispatch();
    const dashboardWidth = window.screen.width - (startMenuWidth / 5);
    const minimizedItemWidth =  window.screen.width / 8;
    return (
        <div className="desktop-dashboard"
            style={{
                width: dashboardWidth + "px",
                left: startMenuWidth + "px"
            }}
        >
            {Object.keys(viewports).map((name, index) => {
                return (
                    <div
                        onClick={() => dispatch(maximize({ name }))}
                        name={name}
                        key={"dashboard-minimized-item" + index}
                        className="xp-btn desktop-dashboard-minized-item"
                        style={{ 
                            display: viewports[name].minimized ? "block" : "none",
                            width: minimizedItemWidth + "px"
                        }}
                    >
                        <div className='xp desktop-dashboard-minimized-item'>

                        <div className='desktop-dashboard-minimized-item-icon'>
                            <img  src={viewports[name].iconPath} alt={name} />
                        </div>
                        <div className='desktop-dashboard-minimized-item-label'>
                            {name}
                        </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Dashboard;