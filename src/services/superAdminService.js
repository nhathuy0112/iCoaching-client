import axios from '~/api/axios';

const END_POINTS = {
    REGISTER: '/SuperAdmin/admin',
    UPDATE: '/SuperAdmin/admin/status',
    ADMINS: '/SuperAdmin/admins',
    PROFILE: '/User/profile',
    GETAVATAR: '/User/avatar',
    POSTAVATAR: '/User/avatar',
};

export const register = (payload) => axios.post(END_POINTS.REGISTER, payload);
export const updateProfile = (payload) => axios.put(END_POINTS.PROFILE, payload);
export const updateStatus = (adminId) => axios.put(`${END_POINTS.UPDATE}/${adminId}`);
export const getUserAvatar = (payload) => axios.get(END_POINTS.GETAVATAR, payload);
export const postUserAvatar = (payload) => axios.post(END_POINTS.POSTAVATAR, payload);
export const getAdmins = (currentPage, pageSize, search, sort) => {
    const searchParam = search ? `&Search=${search}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    return axios.get(`${END_POINTS.ADMINS}?PageIndex=${currentPage}&PageSize=${pageSize}${sortParam}${searchParam}`);
};
