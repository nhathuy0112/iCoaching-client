import axios from '~/api/axios'

const END_POINTS = {
    GET_ALL: 'Admin/coaches',
    UPDATE_STATUS: '/Admin/coach-account-status'
};

export const getAllCoaches = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.GET_ALL}${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}`);
};

export const updateStatus = (coachId) => axios.put(`${END_POINTS.UPDATE_STATUS}/${coachId}`);
