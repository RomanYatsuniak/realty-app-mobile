import axios from './configuration';
// import axios from "axios";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ5YXRzdW5pYWtAZ21haWwuY29tIiwic3ViIjo0NiwiaWF0IjoxNjM4NjQ0NDk2LCJleHAiOjE2NTA2NDQ0OTZ9.IHkfrRTcN_jiKcWO-PEz93XrOxMJxIj6-51tVRExu6Q"
import {ILogin} from "../shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const login = async (loginData: ILogin) => {
    return await axios.post('/auth/login', loginData)
}

export const register = async (data: any) => {
    return await axios.post('/user', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}

export const getSellPublications = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${TOKEN}` }
    };
    return await axios.get('publication/find/sell', config);
}

export const getRentPublications = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${TOKEN}` }
    };
    return await axios.get('publication/find/rent', config);
}

export const getPublicationById = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${TOKEN}` }
    };
    return await axios.get(`/publication/${id}`, config);
}
