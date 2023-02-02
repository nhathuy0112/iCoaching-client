import axios from '~/api/axios';
import { getLocalStorage } from '~/utils';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 300000,
});

instance.interceptors.request.use((config) => {
    //handle token
    if (getLocalStorage('auth')) {
        let token = getLocalStorage('auth').jwt.token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        switch (error.response.status) {
            case 401:
                const message401 = error.response.data.error;
                return Promise.reject(message401);
            case 400:
                const message400 = error.response.data.fail || error.response.data;
                return Promise.reject(message400);
            default:
                break;
        }
    },
);

export default instance;
