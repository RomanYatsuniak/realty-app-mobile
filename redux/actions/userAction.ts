import {AppDispatch} from "../store";
import {login} from "../../api/api";
import {ILogin} from "../../shared/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authUser} from "../reducers/userSlice";
export const loginUser = (loginData: ILogin) => async (dispatch: AppDispatch) => {
    try {
        const res = await login(loginData);
        await AsyncStorage.setItem('access_token', res.data.access_token);
        dispatch(authUser())
    } catch (e) {
        console.log(e.response.data.message);
    }
};
