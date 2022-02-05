import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modalIsShown: false,
    filterModalShow: false,
    filterType: "sale",
    ownerInfo: null,
    modalData: '',
    publications: [],
    isLoading: false,
    publication: null,
    error: '',
    userNotes: null,
    userPublications: null,
    listOfActiveReservations: null,
};

const mainSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRentRealties(state, action) {
            state.publications = action.payload;
            // console.log(payload);
        },
        setSellRealties(state, action) {
            state.publications = action.payload;
            // console.log(payload);
        },
        setPublicationsFromLowToHigh(state) {
            if (state.publications) {
                state.publications.sort((a, b) => a.price > b.price ? 1 : -1);
            }

        },
        setPublicationsFromHighToLow(state) {
            state.publications.sort((a, b) => a.price > b.price ? -1 : 1);
        },
        setFilteredPublications(state, action) {
            state.publications = action.payload;
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
        showFilter(state, action) {
            state.filterType = action.payload.includes('Rent') ? 'rent' : 'sale';
            state.filterModalShow = true;
        },
        hideFilter(state) {
            state.filterModalShow = false;
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
        },
        removeUserReservation(state, action) {
            console.log(action.payload);
            const reservations = state.listOfActiveReservations.filter(r => r.rentId !== action.payload);
            state.listOfActiveReservations = reservations;
        },
        setUserPublications(state, action) {
            // console.log(action.payload);
            console.log('ffff')
            state.userPublications = action.payload;
        },
        removeUserPublication(state, action) {
            console.log(state.userPublications, action.payload);
            const publications = state.userPublications.filter(n => n.publicationId !== action.payload);
            console.log(publications)
            state.userPublications = publications;
        }
    },
});

export const {setFilteredPublications, showFilter, hideFilter, setPublicationsFromHighToLow, setPublicationsFromLowToHigh, setUserPublications, removeUserPublication, removeUserReservation, setUserActiveReservations, setUserNotes, removeUserNotes, setRentRealties, setSellRealties, setPublication, hideModal, showModal, showErrorModal, setOwnerInfo} = mainSlice.actions;

export default mainSlice.reducer;
