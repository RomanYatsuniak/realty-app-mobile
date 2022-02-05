import axios from './configuration';
// import axios from "axios";
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ5YXRzdW5pYWtAZ21haWwuY29tIiwic3ViIjo0NiwiaWF0IjoxNjM5MDg5MzkzLCJleHAiOjE2NTEwODkzOTN9.vy56mW9NBPOKiqsHS52Iz46wMcPSXK94adZ3DfyLDYs"
import {ILogin} from "../shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from 'qs';
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
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get('publication/find/sell', config);
}

export const getRentPublications = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get('publication/find/rent', config);
}

export const getPublicationById = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/publication/${id}`, config);
}

export const getOwnerInfo = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const a = await axios.get(`/user/${id}`, config);
    return a;
}

export const addToNotes = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    console.log(id);
    // const a = await fetch('https://realty-app-api.herokuapp.com/user/notes/58', {
    //     method: 'POST',
    //     headers: { Authorization: `Bearer ${TOKEN}` }
    // })
    return await axios.post(`/user/notes/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const getUserNotes = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    // const a = await fetch('https://realty-app-api.herokuapp.com/user/notes/58', {
    //     method: 'POST',
    //     headers: { Authorization: `Bearer ${TOKEN}` }
    // })
    return await axios.get(`/user/notes`, config);
}

export const deleteNote = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    console.log(id);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.delete(`/user/notes/${id}`, config);

}

export const getUserActiveReservations = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/reserve/client`, config);
}

export const removeReservation = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.delete(`/realty/reserve/${id}`, config);

}

export const createPublication = async (data: any) => {
    const token = await AsyncStorage.getItem('access_token');
    return await axios.post('/publication', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
    });
}

export const reserveRealty = async (data, id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(`/realty/reserve/${id}`, data, config);
}

export const buyRealty = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(`/realty/buy/${id}`, {}, config);
}

export const getMyInfo = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/user/userInfo`, config);
}

export const getUserPurchases = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/buy/client/history`, config);
}

export const getUserSellings = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/buy/owner/history`, config);
}

export const getUserHistoryOfReservations = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/reserve/client/history`, config);
}

export const leaveUserReview = async (data) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(`/user/createReview`, data, config);
}

export const leavePublicationReview = async (id, data) => {
    console.log(data);
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(`/publication/${id}/review`, data, config);
}

export const getUserPublications = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/publication/user`, config);
}

export const deletePublication = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.delete(`/publication/${id}`, config);

}
export const updatePublication = async (id, data) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.patch(`/publication/${id}`, data, config);

}

export const getActiveReservationsOfMyRealty = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/reserve/owner`, config);

}
export const getStatistics = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/reserve/owner/statistics`, config);

}

export const updateUserInfo = async (data) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.patch(`/user/userInfo`, data, config);

}

export const giveInfoToOwner = async (data, id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(`/realty/buy/client/${id}`, data, config);

}

export const getInfoFromOwner = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/buy/owner/${id}`, config);
}

export const giveInfoToBuyerOfRealty = async (data, id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(`/realty/buy/owner/${id}`, data, config);

}

export const getInfoFromBuyer = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(`/realty/buy/client/${id}`, config);
}

export const getFilteredData = async (data) => {
    const token = await AsyncStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    console.log(data);
    return await axios.post(`/publication/find`, data, config);
}



