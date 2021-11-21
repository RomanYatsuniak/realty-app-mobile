import axios from './configuration';
// import axios from "axios";
import {ILogin} from "../shared/types";
export const login = async (loginData: ILogin) => {
    return await axios.post('/auth/login', loginData)
}

export const register = async (data: any) => {
    return await axios.post('/user', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}
