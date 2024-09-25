import { createSlice } from '@reduxjs/toolkit';
import { percentageToPixels } from '../../utils/elements/units';
const viewportsSlice = createSlice({
    name: 'viewports',
    initialState : {
        "About" : {
            name: "About",  
            hidden: false,
            id: "viewport-about",
            zIndex: 4,
            bounds: {
                width: percentageToPixels(40, "width", window.screen.width), 
                height: percentageToPixels(70, "height", window.screen.height), 
                top:  percentageToPixels(2, "top", window.screen.height), 
                left: percentageToPixels(30, "left", window.screen.width), 
            },            
            Component: 'About'
        },
        "Draw" : {
            name: "Draw",  
            hidden: false,
            zIndex: 3,
            bounds: {
                width: percentageToPixels(30, "width", window.screen.width), 
                height: percentageToPixels(50, "height", window.screen.height), 
                top:  percentageToPixels(5, "top", window.screen.height), 
                left: percentageToPixels(20, "left", window.screen.width), 
            },            
            Component: 'Draw'
        },
        "Snake" : {
            name: "Snake",  
            id: "viewport-snake",
            hidden: false,
            zIndex: 2,
            bounds: {
                width:300, 
                height:345, 
                top:  percentageToPixels(5, "top", window.screen.height), 
                left: percentageToPixels(20, "left", window.screen.width), 
                maxWidth: 500,
                maxHeight: 575,
                minWidth: 300,
                minHeight: 345
            },            
            Component: 'Snake'
        },
        "photo" : {
            name: "Photos",  
            iconPath: "/images/landing-icons/photo-icon.png",
            hidden: false,
            zIndex: 1,
            bounds: {
                width: percentageToPixels(31, "width", window.screen.width), 
                height: percentageToPixels(47, "height", window.screen.height), 
                top:  percentageToPixels(5, "top", window.screen.height), 
                left: percentageToPixels(0, "left", window.screen.width), 
            },
            Component: 'Photos'
        },
        "webcam" : {
            name: "Webcam",  
            iconPath: "/images/landing-icons/photo-icon.png",
            hidden: false,
            zIndex: 0,
            bounds: {
                width: percentageToPixels(30, "width", window.screen.width), 
                height: percentageToPixels(20, "height", window.screen.height), 
                top:  percentageToPixels(9, "top", window.screen.height), 
                left: percentageToPixels(50, "left", window.screen.width), 
            },
            Component: 'Webcam'
        }
    },
    reducers: {
        update: (state, action) => {
            state[action.payload.name] = {...state[action.payload.name], ...action.payload};
        }
    }
});

export const { update} = viewportsSlice.actions;
export default viewportsSlice.reducer;
