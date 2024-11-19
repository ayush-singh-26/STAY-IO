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
        signInStart(state) {
            state.status = true;
            state.loading = true;        
        },
        signInSuccess(state,action) {
            state.status = true;
            state.userData = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure(state, action) {
            state.status = false;
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.userData = null;
            state.loading = false;
            state.error = false;
        },
        deleteUser:(state)=>{
            state.userData = null;
            state.loading = false;
            state.error = false;
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,signOut,deleteUser} = authSlice.actions;

export default authSlice.reducer;