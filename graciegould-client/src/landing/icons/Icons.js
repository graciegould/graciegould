import Icon from './Icon';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { show } from '../../store/reducers/viewportsReducer';
function Icons() {
    const viewports = useSelector(state => state.viewports);
    const dispatch = useDispatch();
    const icons = [
        'about',
        'about',
        'about',
        'about',
        'about',
    ];
    return (
        <div className="desktop-icons" >
            {Object.keys(viewports).map((name, i) => (
                <div className='desktop-icon-container' key={"icon-"+name+i} onDoubleClick={() => {
                    dispatch(show({ name }));
                }}>
                    <img src={viewports[name].iconPath} alt={name} />
                   <div className='desktop-icon-label'>{name}</div>
                </div>
            ))}
        </div>
    )
}

export default Icons;