import axios from '~/api/axios'

const END_POINTS = {
    CERTIFICATION_REQUEST: '/Coach/certification-request'
}

export const certificationSubmit = (files) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });
    return axios.post(END_POINTS.CERTIFICATION_REQUEST, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getCertificationRequest = () => axios.get(END_POINTS.CERTIFICATION_REQUEST);