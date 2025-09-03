import { createSlice } from "@reduxjs/toolkit";



const searchSlice= createSlice({
    name: 'search',
    initialState: {
        searchQuery: '',
        searchResults: [],
        selectedHotel : null
    },
    reducers: {
        setSearchQuery(state, action){
            state.searchQuery = action.payload;
        },
        setSearchResults(state, action){
            state.searchResults = action.payload;
        },
        setSelectedHotel(state, action) {
            state.selectedHotel = action.payload;
        },
    }
})

export const { setSearchQuery, setSearchResults,setSelectedHotel } = searchSlice.actions;

export default searchSlice.reducer;