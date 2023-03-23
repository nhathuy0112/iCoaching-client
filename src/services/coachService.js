import axios from '~/api/axios';

const END_POINTS = {
    CERTIFICATION_REQUEST: '/Coach/certification-request',
    ABOUT_ME: '/Coach/about-me',
    PORTFOLIO_PHOTOS: '/Coach/portfolio-photos',
    PHOTO_REMOVE: '/Coach/photo-remove',
    TRAINING_COURSE: '/Coach/training-course',
    COACHING_REQUEST: '/Coach/coaching-request',
    CONTRACT: '/Coach/contract',
};

//verification
export const certificationSubmit = (payload) => {
    return axios.post(END_POINTS.CERTIFICATION_REQUEST, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getCertificationRequest = () => axios.get(END_POINTS.CERTIFICATION_REQUEST);

//portfolio
export const postAboutMe = (data) =>
    axios.post(END_POINTS.ABOUT_ME, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const getAboutMe = () => axios.get(END_POINTS.ABOUT_ME);

export const postPortfolioPhotos = (payload) =>
    axios.post(END_POINTS.PORTFOLIO_PHOTOS, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const getPortfolioPhotos = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.PORTFOLIO_PHOTOS}${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}`);
}

export const removePortfolioPhotos = (photoId) => axios.delete(`${END_POINTS.PHOTO_REMOVE}/${photoId}`);

//training courses
export const addTrainingCourse = (payload) => axios.post(END_POINTS.TRAINING_COURSE, payload);

export const getTrainingCourses = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.TRAINING_COURSE}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}`);
};

export const getTrainingCourseById = (id) => axios.get(`${END_POINTS.TRAINING_COURSE}/${id}`);

export const editTrainingCourse = (id, payload) => axios.put(`${END_POINTS.TRAINING_COURSE}/${id}`, payload);

export const deleteTrainingCourse = (id) => axios.delete(`${END_POINTS.TRAINING_COURSE}/${id}`);

//coaching request
export const getCoachingRequests = ({ pageIndex, pageSize, sort, search, coachRequestStatus }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    const coachRequestStatusParam = coachRequestStatus ? `&coachRequestStatus=${coachRequestStatus}` : '';
    return axios.get(
        `${END_POINTS.COACHING_REQUEST}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}${coachRequestStatusParam}`,
    );
};

export const updateCoachingRequest = ({ requestId, options, data }) =>
    axios.put(`${END_POINTS.COACHING_REQUEST}/${requestId}?options=${options}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

//contract
export const getAllContracts = ({ pageIndex, pageSize, sort, search, status }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    const statusParam = status ? `&status=${status}` : '';
    return axios.get(
        `${END_POINTS.CONTRACT}s${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}${statusParam}`,
    );
};
