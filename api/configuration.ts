import axios from 'axios';
const API_URL = 'https://realty-app-api.herokuapp.com';
export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
