import axios from '~/api/axios';

const END_POINTS = {
    COACHES: 'Admin/coaches',
    UPDATE_STATUS: 'Admin/coach-account-status',
    WARNING: 'Admin/coach-warning',
    CERT_REQUEST: 'Admin/cert-request',
    REPORT: 'Admin/report',
    VOUCHER: '/Admin/voucher',
};

export const getAllCoaches = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.COACHES}${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}`);
};

export const updateStatus = (coachId) => axios.put(`${END_POINTS.UPDATE_STATUS}/${coachId}`);

export const warnCoach = (coachId) => axios.put(`${END_POINTS.WARNING}/${coachId}`);

export const getAllCertRequests = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(
        `${END_POINTS.CERT_REQUEST}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}&status=Pending`,
    );
};

export const getCertRequestDetail = (certId) => axios.get(`${END_POINTS.CERT_REQUEST}-detail/${certId}`);

export const updateCertStatus = (payload) => {
    return axios.put(
        `${END_POINTS.CERT_REQUEST}-status/${payload.certId}?option=${payload.option}`,
        JSON.stringify(payload.data),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};

//report
export const createContract = ({ reportId, data }) => axios.post(`${END_POINTS.REPORT}/${reportId}/new-contract`, data);

export const getAllReports = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.REPORT}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}&status=Pending`);
};

export const createVoucher = ({ reportId, discount, data }) =>
    axios.post(`${END_POINTS.VOUCHER}/${reportId}?discount=${discount}`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const updateReport = ({ reportId, option, message }) => {
    return axios.put(`${END_POINTS.REPORT}/${reportId}?optionForAdmin=${option}`, JSON.stringify(message), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const updateContractStatus = ({ reportId, option, data }) =>
    axios.put(`${END_POINTS.REPORT}/${reportId}/contract-status?option=${option}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
