import axios from '~/api/axios';

const END_POINTS = {
    REGISTER: '/User/register',
    LOGIN: '/User/login',
    REFRESH: '/User/refresh',
    LOGOUT: '/User/logout',
    FORGOT: '/User/password-forgot',
    PROFILE: '/User/profile',
};

export const register = (payload) => axios.post(END_POINTS.REGISTER, payload);

export const login = (payload) => axios.post(END_POINTS.LOGIN, payload);

export const refresh = (payload) => axios.post(END_POINTS.REFRESH, payload);

export const logout = (payload) => axios.post(END_POINTS.LOGOUT, payload);

export const forgot = (email) => axios.get(`${END_POINTS.FORGOT}?email=${email}`);

export const getUserProfile = () => axios.get(`${END_POINTS.PROFILE}`);
