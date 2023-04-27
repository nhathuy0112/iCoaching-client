import axios from 'axios';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '~/utils/localStorage';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
    async (error) => {
        console.log(error.response);
        switch (error.response.status) {
            case 401:
                // call refresh token
                // call failure api
                // TODO: enhance call refresh token only one
                if (!getLocalStorage('auth')) {
                    const message401 = error.response.data.message;
                    return Promise.reject(message401);
                } else {
                    const accessToken = getLocalStorage('auth').accessToken;
                    const refreshToken = getLocalStorage('auth').refreshToken;
                    const data = {
                        accessToken,
                        refreshToken,
                    };
                    try {
                        const token = await instance.post('/User/refresh', data);
                        setLocalStorage('auth', token);
                        return instance(error.config);
                    } catch (error) {
                        removeLocalStorage('auth');
                        window.location.href = '/';
                    }
                }
                break;
            case 400:
                if (error.response.data?.Account.errorCode === 'LOCKED') {
                    removeLocalStorage('auth');
                    window.location.href = '/';
                }
                const message400 = error.response.data.errors || error.response.data.message;
                return Promise.reject(message400);
            default:
                break;
        }
    },
);

export default instance;
