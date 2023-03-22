import axios from '~/api/axios';

const END_POINTS = {
    GET_ALL: '/coaches',
    GET_BY_ID: '/coach',
};

export const getAllCoaches = ({ pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(`${END_POINTS.GET_ALL}${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}`);
};

export const getCoachProfile = (coachId) => axios.get(`${END_POINTS.GET_BY_ID}/${coachId}/profile`);

export const getCoachAbout = (coachId) => axios.get(`${END_POINTS.GET_BY_ID}/${coachId}/about-me`);

export const getCoachPhotos = ({ coachId, pageIndex, pageSize }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    // const sortParam = sort ? `&Sort=${sort}` : '';
    // const searchParam = search ? `&Search=${search}` : '';
    return axios.get(
        `${END_POINTS.GET_BY_ID}/${coachId}/photos${pageIndexParam}${pageSizeParam}`,
    );
}

export const getCoachTrainingCourses = ({ coachId, pageIndex, pageSize, sort, search }) => {
    const pageIndexParam = pageIndex ? `?PageIndex=${pageIndex}` : '';
    const pageSizeParam = pageSize ? `&PageSize=${pageSize}` : '';
    const sortParam = sort ? `&Sort=${sort}` : '';
    const searchParam = search ? `&Search=${search}` : '';
    return axios.get(
        `${END_POINTS.GET_BY_ID}/${coachId}/training-courses${pageIndexParam}${pageSizeParam}${sortParam}${searchParam}`,
    );
};

export const getCoachTrainingCourseDetails = (coachId, courseId) =>
    axios.get(`${END_POINTS.GET_BY_ID}/${coachId}/training-course-detail/${courseId}`);
