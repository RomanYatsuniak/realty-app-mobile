import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modalIsShown: false,
    ownerInfo: null,
    modalData: '',
    publications: [],
    isLoading: false,
    publication: null,
    error: '',
    userNotes: null,
    listOfActiveReservations: null,
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
        },
        setOwnerInfo(state, payload) {
            state.ownerInfo = payload.payload[0];
        },
        setUserNotes(state, payload) {
            state.userNotes = payload.payload;
        },
        removeUserNotes(state, payload) {
            const notes = state.userNotes.filter(n => n.publication.publicationId !== payload.payload);
            state.userNotes = notes;
        },
        setUserActiveReservations(state, payload) {
            state.listOfActiveReservations = payload.payload;
        }
        // authUser(state) {
        //     state.isAuth = true
        // }
    },
});

export const {setUserActiveReservations, setUserNotes, removeUserNotes, setRentRealties, setSellRealties, setPublication, hideModal, showModal, showErrorModal, setOwnerInfo} = mainSlice.actions;

export default mainSlice.reducer;
