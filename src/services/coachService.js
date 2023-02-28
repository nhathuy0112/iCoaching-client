import axios from '~/api/axios'

const END_POINTS = {
    CERTIFICATION_SUBMIT: '/Coach/certification-submit'
}

export const certificationSubmit = (payload) => {
    const formData = new FormData();
    payload.files.forEach(file => {
        formData.append('files', file);
    });
    return axios.post(END_POINTS.CERTIFICATION_SUBMIT, formData);
};