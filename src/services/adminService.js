import axios from '~/api/axios'

const END_POINTS = {
    GET_ALL_COACHES: 'Admin/coaches',
    UPDATE_STATUS: 'Admin/coach-account-status',
    GET_ALL_CERT_REQUESTS: 'Admin/cert-requests',
    GET_CERT_REQUEST_DETAIL: 'Admin/cert-request-detail',
    UPDATE_CERT_STATUS: 'Admin/cert-request-status'
};

export const getAllCoaches = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.GET_ALL_COACHES}${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}`);
};

export const updateStatus = (coachId) => axios.put(`${END_POINTS.UPDATE_STATUS}/${coachId}`);


export const getAllCertRequests = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.GET_ALL_CERT_REQUESTS}${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}&status=Pending`);
};

export const getCertRequestDetail = (certId) => axios.get(`${END_POINTS.GET_CERT_REQUEST_DETAIL}/${certId}`)

export const updateCertStatus = (payload) => {
    return axios.put(`${END_POINTS.UPDATE_CERT_STATUS}/${payload.certId}?option=${payload.option}`, payload.data, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}