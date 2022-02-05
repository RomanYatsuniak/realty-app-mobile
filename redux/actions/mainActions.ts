import {AppDispatch, setupStore} from "../store";
import {
    deleteNote, deletePublication, getFilteredData,
    getOwnerInfo,
    getPublicationById,
    getRentPublications,
    getSellPublications, getUserActiveReservations,
    getUserNotes, getUserPublications
} from "../../api/api";
import {
    hideFilter,
    removeUserNotes, removeUserPublication, setFilteredPublications,
    setOwnerInfo,
    setPublication,
    setRentRealties,
    setSellRealties, setUserActiveReservations,
    setUserNotes, setUserPublications, showModal
} from "../reducers/mainSlice";

export const getRealtiesForSale = () => async (dispatch: AppDispatch) => {
    try {
        // console.log('sale')
        const publications = await getSellPublications();
        dispatch(setSellRealties(publications.data))
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const getRealtiesForRent = () => async (dispatch: AppDispatch) => {
    try {
        // console.log('rent')
        const publications = await getRentPublications();
        dispatch(setRentRealties(publications.data))
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const getPublicationInfo = (id) => async (dispatch: AppDispatch) => {
    try {
        const publication = await getPublicationById(id);
        // console.log(publication.data);
        dispatch(setPublication(publication.data));
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const getOwner = (id) => async (dispatch: AppDispatch) => {
    try {
        const publication = await getOwnerInfo(id);
        // console.log(publication);
        dispatch(setOwnerInfo(publication.data));
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const getNotes = () => async (dispatch: AppDispatch) => {
    try {
        const notes = await getUserNotes();
        dispatch(setUserNotes(notes.data));
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const removeNote = (id) => async (dispatch: AppDispatch) => {
    try {
        await deleteNote(id);
        dispatch(removeUserNotes(id));
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const getActiveReservations = () => async (dispatch: AppDispatch) => {
    try {
        const reservations = await getUserActiveReservations();
        dispatch(setUserActiveReservations(reservations.data));
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const getMyPublications = () => async (dispatch: AppDispatch) => {
    try {
        const userPublications = await getUserPublications();
        dispatch(setUserPublications(userPublications.data));
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const removePublication = (id) => async (dispatch: AppDispatch) => {
    try {
        await deletePublication(id);
        dispatch(removeUserPublication(id));
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}

export const filterPublications = (data, type) => async (dispatch: AppDispatch) => {
    try {
        console.log(data, type)
        const realtyFilterData: any = {};
        Object.keys(data).forEach(k => data[k] && (realtyFilterData[k] = data[k]))
        console.log(realtyFilterData);
        const res = await getFilteredData({
            publicationType: type,
            realty: realtyFilterData
        })
        // console.log(res.data);
        // await deletePublication(id);
        dispatch(setFilteredPublications(res.data));
    } catch (e) {
        dispatch(hideFilter());
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
}
