import {AppDispatch} from "../store";
import {getRentPublications, getSellPublications} from "../../api/api";
import {setRentRealties, setSellRealties} from "../reducers/mainSlice";

export const getRealtiesForSale = () => async (dispatch: AppDispatch) => {
    try {
        console.log('sale')
        const publications = await getSellPublications();
        dispatch(setSellRealties(publications.data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export const getRealtiesForRent = () => async (dispatch: AppDispatch) => {
    try {
        console.log('rent')
        const publications = await getRentPublications();
        dispatch(setRentRealties(publications.data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}
