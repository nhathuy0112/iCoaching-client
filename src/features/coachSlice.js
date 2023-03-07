import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { certificationSubmit, getCertificationRequest, postAboutMe, getAboutMe } from '~/services/coachService';

export const certificationSubmitAsync = createAsyncThunk('/coach/certificationSubmit', async (payload) => {
    try {
        const response = await certificationSubmit(payload);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getCertificationAsync = createAsyncThunk('/coach/getCertificationRequest', async () => {
    try {
        const response = await getCertificationRequest();
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const postAboutMeAsync = createAsyncThunk('/coach/postAboutMe', async (data) => {
    try {
        const response = await postAboutMe(data);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const getAboutMeAsync = createAsyncThunk('/coach/getAboutMe', async () => {
    try {
        const response = await getAboutMe();
        return response;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    certificationImages: [],
    loading: false,
    error: null,
    message: '',
    status: null,
    aboutMe: '',
};

export const coachSlice = createSlice({
    name: 'coach',
    initialState,
    extraReducers: (builder) => {
        builder
            //submit certification
            .addCase(certificationSubmitAsync.pending, (state) => {
                state.isRequestSent = false;
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(certificationSubmitAsync.fulfilled, (state, action) => {
                state.certificationImages = action.payload.urls;
                state.status = action.payload.status;
            })
            .addCase(certificationSubmitAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get certification
            .addCase(getCertificationAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCertificationAsync.fulfilled, (state, action) => {
                state.certificationImages = action.payload.urls;
                state.status = action.payload.status;
            })
            .addCase(getCertificationAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //post about me
            .addCase(postAboutMeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postAboutMeAsync.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(postAboutMeAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get about me
            .addCase(getAboutMeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAboutMeAsync.fulfilled, (state, action) => {
                state.aboutMe = action.payload;
            })
            .addCase(getAboutMeAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
    }
})

export default coachSlice.reducer;