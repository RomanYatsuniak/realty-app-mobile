import {AppDispatch} from "../store";
import {login} from "../../api/api";
import {ILogin} from "../../shared/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authUser} from "../reducers/userSlice";
import {showModal} from "../reducers/mainSlice";
export const loginUser = (loginData: ILogin) => async (dispatch: AppDispatch) => {
    try {
        const res = await login(loginData);
        await AsyncStorage.setItem('access_token', res.data.access_token);
        dispatch(authUser())
    } catch (e) {
        if (e.response?.data?.message) {
            dispatch(showModal(e.response?.data?.message))
        } else {
            dispatch(showModal('Something went wrong'))
        }

        console.log(e.response?.data?.message);
    }
};


