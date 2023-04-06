import axios from '~/api/axios';

const END_POINTS = {
    COACHING_REQUEST: 'Client/coaching-request',
    CONTRACT: '/Client/contract',
    VOUCHER: '/Client/voucher',
};

export const sendCoachingRequest = ({ coachId, courseId, voucherCode, data }) => {
    const voucherCodeParam = voucherCode ? `&voucherCode=${voucherCode}` : '';
    return axios.post(
        `${END_POINTS.COACHING_REQUEST}?coachId=${coachId}&courseId=${courseId}${voucherCodeParam}`,
        JSON.stringify(data),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};

export const getCoachingRequests = ({ pageIndex, pageSize, sort, search, clientRequestStatus }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    const clientRequestStatusParam = clientRequestStatus ? `&clientRequestStatus=${clientRequestStatus}` : '';
    return axios.get(
        `${END_POINTS.COACHING_REQUEST}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}${clientRequestStatusParam}`,
    );
};

export const getTrainingCourses = ({ pageIndex, pageSize, sort, search, status }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    const statusParam = status ? `&statusDto=${status}` : '';
    return axios.get(
        `${END_POINTS.CONTRACT}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}${statusParam}`,
    );
};

export const cancelTrainingRequest = ({ requestId, data }) =>
    axios.put(`${END_POINTS.COACHING_REQUEST}-cancellation/${requestId}`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const getPaymentLink = (requestId) => axios.get(`${END_POINTS.COACHING_REQUEST}/${requestId}/payment-url`);

//completed contract
export const completedContract = (contractId) => axios.put(`${END_POINTS.CONTRACT}/${contractId}/completion`);

//get vouchers
export const getAllVouchers = () => axios.get(`${END_POINTS.VOUCHER}s`);
