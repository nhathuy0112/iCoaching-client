import axios from '~/api/axios';

const END_POINTS = {
    COACHING_REQUEST: 'Client/coaching-request',
    CONTRACTS: '/Client/contracts',
};

export const sendCoachingRequest = (coachId, courseId, data) =>
    axios.post(`${END_POINTS.COACHING_REQUEST}?coachId=${coachId}&courseId=${courseId}`);

export const getCoachingRequest = ({ pageIndex, pageSize, sort, search, clientRequestStatus }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    const clientRequestStatusParam = clientRequestStatus ? `&clientRequestStatus=${clientRequestStatus}` : '';
    return axios.get(
        `${END_POINTS.COACHING_REQUEST}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}${clientRequestStatusParam}`,
    );
};
