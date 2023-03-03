import axios from '~/api/axios'

const END_POINTS = {
    CERTIFICATION_REQUEST: '/Coach/certification-request'
}

export const certificationSubmit = (payload) => {
    return axios.post(END_POINTS.CERTIFICATION_REQUEST, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getCertificationRequest = () => axios.get(END_POINTS.CERTIFICATION_REQUEST);