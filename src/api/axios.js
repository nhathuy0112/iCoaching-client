import axios from 'axios';
import { getLocalStorage } from '~/utils/localStorage';

let accessToken = getLocalStorage('auth') ? getLocalStorage('auth').accessToken : null;

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_LOCAL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    timeout: 300000,
});

instance.interceptors.request.use((config) => {
    //handle token
    if (getLocalStorage('auth')) {
        let token = getLocalStorage('auth').accessToken;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error.response);
        switch (error.response.status) {
            case 401:
                const message401 = error.response.data.message;
                return Promise.reject(message401);
            case 400:
                const message400 = error.response.data.errors || error.response.data.message;
                return Promise.reject(message400);
            default:
                break;
        }
    },
);

export default instance;
