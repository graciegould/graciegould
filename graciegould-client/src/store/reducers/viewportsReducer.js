import { createSlice } from '@reduxjs/toolkit';
import { percentageToPixels } from '../../utils/elements/units';
const viewportsSlice = createSlice({
    name: 'viewports',
    initialState : {
        "About" : {
            name: "About",  
            iconPath: "/images/landing-icons/contact-icon.png",
            hidden: false,
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
            bounds: {
                width: percentageToPixels(30, "width", window.screen.width), 
                height: percentageToPixels(50, "height", window.screen.height), 
                top:  percentageToPixels(5, "top", window.screen.height), 
                left: percentageToPixels(20, "left", window.screen.width), 
            },            
            Component: 'Draw'
        }
        // "photo" : {
        //     name: "Photos",  
        //     iconPath: "/images/landing-icons/photo-icon.png",
        //     hidden: false,
        //     bounds: {
        //         width: percentageToPixels(10, "width", window.screen.width), 
        //         height: percentageToPixels(10, "height", window.screen.height), 
        //         top:  percentageToPixels(0, "top", window.screen.height), 
        //         left: percentageToPixels(0, "left", window.screen.width), 
        //     },
        //     Component: 'Photos'
        // },
        // "webcam" : {
        //     name: "Webcam",  
        //     iconPath: "/images/landing-icons/photo-icon.png",
        //     hidden: false,
        //     bounds: {
        //         width: percentageToPixels(10, "width", window.screen.width), 
        //         height: percentageToPixels(10, "height", window.screen.height), 
        //         top:  percentageToPixels(0, "top", window.screen.height), 
        //         left: percentageToPixels(0, "left", window.screen.width), 
        //     },
        //     Component: 'Webcam'
        // }
    },
    reducers: {
        update: (state, action) => {
            state[action.payload.name] = {...state[action.payload.name], ...action.payload};
        }
    }
});

console.log("viewportsSlice", viewportsSlice);
export const { update} = viewportsSlice.actions;
export default viewportsSlice.reducer;
