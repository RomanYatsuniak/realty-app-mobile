import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    // rentPublications: [],
    // sellPublications: [],
    publications: [],
    isLoading: false,
    error: '',
};

const mainSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRentRealties(state, payload) {
            state.publications = payload;
            console.log(payload);
        },
        setSellRealties(state, payload) {
            state.publications = payload;
            console.log(payload);
        }
        // authUser(state) {
        //     state.isAuth = true
        // }
    },
});

export const {setRentRealties, setSellRealties} = mainSlice.actions;

export default mainSlice.reducer;
