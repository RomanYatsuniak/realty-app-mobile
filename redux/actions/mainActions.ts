import {AppDispatch, setupStore} from "../store";
import {
    deleteNote,
    getOwnerInfo,
    getPublicationById,
    getRentPublications,
    getSellPublications, getUserActiveReservations,
    getUserNotes
} from "../../api/api";
import {
    removeUserNotes,
    setOwnerInfo,
    setPublication,
    setRentRealties,
    setSellRealties, setUserActiveReservations,
    setUserNotes
} from "../reducers/mainSlice";

export const getRealtiesForSale = () => async (dispatch: AppDispatch) => {
    try {
        // console.log('sale')
        const publications = await getSellPublications();
        dispatch(setSellRealties(publications.data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export const getRealtiesForRent = () => async (dispatch: AppDispatch) => {
    try {
        // console.log('rent')
        const publications = await getRentPublications();
        dispatch(setRentRealties(publications.data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export const getPublicationInfo = (id) => async (dispatch: AppDispatch) => {
    try {
        const publication = await getPublicationById(id);
        // console.log(publication.data);
        dispatch(setPublication(publication.data));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export const getOwner = (id) => async (dispatch: AppDispatch) => {
    try {
        const publication = await getOwnerInfo(id);
        // console.log(publication);
        dispatch(setOwnerInfo(publication.data));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export const getNotes = () => async (dispatch: AppDispatch) => {
    try {
        const notes = await getUserNotes();
        dispatch(setUserNotes(notes.data));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export const removeNote = (id) => async (dispatch: AppDispatch) => {
    try {
        await deleteNote(id);
        dispatch(removeUserNotes(id));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export const getActiveReservations = () => async (dispatch: AppDispatch) => {
    try {
        const reservations = await getUserActiveReservations();
        dispatch(setUserActiveReservations(reservations.data));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}
