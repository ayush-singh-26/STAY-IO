import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    status: false,
    loading:false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInSuccess(state,action) {
            state.status = true;
            state.userData = action.payload;
            state.loading = false;
        },
        signOut: (state) => {
            state.userData = null;
            state.loading = false;
        },
    }
})

export const {signInStart,signInSuccess,signInFailure,signOut} = authSlice.actions;

export default authSlice.reducer;