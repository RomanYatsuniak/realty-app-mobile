import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modalIsShown: false,
    modalData: '',
    publications: [],
    isLoading: false,
    publication: null,
    error: '',
};

const mainSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRentRealties(state, payload) {
            state.publications = payload;
            // console.log(payload);
        },
        setSellRealties(state, payload) {
            state.publications = payload;
            // console.log(payload);
        },
        setPublication(state, payload) {
            state.publication = payload;
        },
        showModal(state, payload) {
            state.modalIsShown = true;
            state.modalData = payload.payload;
        },
        showErrorModal(state) {
            state.modalIsShown = true;
            state.modalData = 'Error';
        },
        hideModal(state) {
            state.modalIsShown = false;
        }
        // authUser(state) {
        //     state.isAuth = true
        // }
    },
});

export const {setRentRealties, setSellRealties, setPublication, hideModal, showModal, showErrorModal} = mainSlice.actions;

export default mainSlice.reducer;
