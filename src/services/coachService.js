import axios from '~/api/axios'

const END_POINTS = {
    CERTIFICATION_SUBMIT: '/Coach/certification-submit'
}

export const certificationSubmit = (payload) => axios.post(END_POINTS.CERTIFICATION_SUBMIT, payload);