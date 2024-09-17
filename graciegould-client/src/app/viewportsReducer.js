import { createSlice } from '@reduxjs/toolkit';

const viewportsSlice = createSlice({
    name: 'viewports',
    initialState : {
        "contact" : {
            name: "viewport1",  
            iconPath: "/images/landing-icons/contact-icon.png",
            hidden: false,
            size: {width: 500, height: 500},
            position: {top: 0, left: 0}
        }
    },
    reducers: {
        updateSize: (state, action) => {
            state[action.payload.name].size = action.payload.size;
        },
    }
});

export const { updateSize } = viewportsSlice.actions;
export default viewportsSlice.reducer;
