import { createSlice } from '@reduxjs/toolkit';
const viewportsSlice = createSlice({
    name: 'viewports',
    initialState : {
        "contact" : {
            name: "viewport1",  
            iconPath: "/images/landing-icons/contact-icon.png",
            hidden: false,
            bounds: {width: 500, height: 500, top: 0, left: 0},
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
