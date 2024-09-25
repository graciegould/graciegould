import { createSlice } from '@reduxjs/toolkit';
import { percentageToPixels } from '../../utils/elements/units';

const Reducers = () => {
    const bringToFront = (state, action) => {
        const { name } = action.payload;
        let sortedViewportKeys = Object.keys(state).sort((a, b) => state[a].zIndex - state[b].zIndex);
        let closestViewport = sortedViewportKeys[sortedViewportKeys.length - 1];
        if (closestViewport === name) return;
        let initialZIndex = state[name].zIndex;
        let newZIndex = null;
        sortedViewportKeys.forEach((viewportName) => {
            if (viewportName !== name) {
                let _zIndex = state[viewportName].zIndex;
                if (_zIndex > initialZIndex) {
                    state[viewportName].zIndex = _zIndex - 1;
                    newZIndex = _zIndex;
                }
            }
        });
        state[name].zIndex = newZIndex;
    }

    const exit = (state, action) => {
        const { name } = action.payload;
        let initialZIndex = state[name].zIndex;
        let sortedViewportKeys = Object.keys(state).sort((a, b) => state[a].zIndex - state[b].zIndex);
        state[name].zIndex = null;
        sortedViewportKeys.forEach((viewportName) => {
            if (
                (
                    viewportName !== name ||
                    state[viewportName].hidden === true
                ) &&
                initialZIndex < state[viewportName].zIndex
            ) {
                state[viewportName].zIndex = state[viewportName].zIndex - 1;
            }
        });
        state[name].hidden = true;
    }

    const show = (state, action) => {
        const { name } = action.payload;
        if(state[name].hidden === false) bringToFront(state, action);
        let newZIndex = 1;
        Object.keys(state).forEach((viewportName) => {
            if (viewportName !== name && state[viewportName].hidden == false)  newZIndex += 1;
        });
        state[name].zIndex = newZIndex;
        state[name].hidden = false;
    }

    const update = (state, action) => {
        state[action.payload.name] = { ...state[action.payload.name], ...action.payload };
    }
    return {
        update,
        show,
        exit,
        bringToFront
    }
}

const viewportsSlice = createSlice({
    name: 'viewports',
    initialState: {
        "About": {
            name: "About",
            hidden: false,
            id: "viewport-about",
            iconPath: "/images/landing/icons/about.png",
            zIndex: 4,
            bounds: {
                width: percentageToPixels(40, "width", window.screen.width),
                height: percentageToPixels(50, "height", window.screen.height),
                top: percentageToPixels(2, "top", window.screen.height),
                left: percentageToPixels(30, "left", window.screen.width),
            },
            Component: 'About'
        },
        "Draw": {
            name: "Draw",
            hidden: true,
            zIndex: 3,
            iconPath: "/images/landing/icons/about.png",
            bounds: {
                width: percentageToPixels(30, "width", window.screen.width),
                height: percentageToPixels(50, "height", window.screen.height),
                top: percentageToPixels(5, "top", window.screen.height),
                left: percentageToPixels(20, "left", window.screen.width),
            },
            Component: 'Draw'
        },
        "Snake": {
            name: "Snake",
            id: "viewport-snake",
            hidden: true,
            zIndex: 2,
            iconPath: "/images/landing/icons/about.png",
            bounds: {
                width: 300,
                height: 345,
                top: percentageToPixels(5, "top", window.screen.height),
                left: percentageToPixels(20, "left", window.screen.width),
                maxWidth: 500,
                maxHeight: 575,
                minWidth: 300,
                minHeight: 345
            },
            Component: 'Snake'
        },
        "photo": {
            name: "Photos",
            hidden: true,
            zIndex: 1,
            iconPath: "/images/landing/icons/about.png",
            bounds: {
                width: percentageToPixels(31, "width", window.screen.width),
                height: percentageToPixels(47, "height", window.screen.height),
                top: percentageToPixels(5, "top", window.screen.height),
                left: percentageToPixels(0, "left", window.screen.width),
            },
            Component: 'Photos'
        },
        "webcam": {
            name: "Webcam",
            iconPath: "/images/landing/icons/about.png",
            hidden: true,
            zIndex: null,
            bounds: {
                width: percentageToPixels(30, "width", window.screen.width),
                height: percentageToPixels(20, "height", window.screen.height),
                top: percentageToPixels(9, "top", window.screen.height),
                left: percentageToPixels(50, "left", window.screen.width),
            },
            Component: 'Webcam'
        }
    },
    reducers: Reducers()
});

export const { update, bringToFront, exit, show } = viewportsSlice.actions;
export default viewportsSlice.reducer;
