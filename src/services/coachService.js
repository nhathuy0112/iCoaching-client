import axios from '~/api/axios'

const END_POINTS = {
    CERTIFICATION_REQUEST: '/Coach/certification-request',
    ABOUT_ME: '/Coach/about-me',
    PORTFOLIO_PHOTOS: '/Coach/portfolio-photos'
}

export const certificationSubmit = (payload) => {
    return axios.post(END_POINTS.CERTIFICATION_REQUEST, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getCertificationRequest = () => axios.get(END_POINTS.CERTIFICATION_REQUEST);

export const postAboutMe = (data) => axios.post(END_POINTS.ABOUT_ME, data, {
    headers: {
        "Content-Type": "application/json",
    }
});

export const getAboutMe = () => axios.get(END_POINTS.ABOUT_ME);

export const postPortfolioPhotos = (payload) => {
    return axios.post(END_POINTS.PORTFOLIO_PHOTOS, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
};

export const getPortfolioPhotos = () => axios.get(END_POINTS.PORTFOLIO_PHOTOS);


