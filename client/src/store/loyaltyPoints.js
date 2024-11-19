import { createSlice } from "@reduxjs/toolkit";


const loyaltyPointsSlice = createSlice({
    name: 'loyaltyPoints',
    initialState: {
        points: 0,
    },
    reducers: {
        addPoints(state, action) {
            state.points = action.payload;
        },
        
    }

})

export const { addPoints } = loyaltyPointsSlice.actions;

export default loyaltyPointsSlice.reducer;