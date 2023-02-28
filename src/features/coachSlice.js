import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { certificationSubmit } from "~/services/coachService";

export const certificationSubmitAsync = createAsyncThunk('/coach/certificationSubmit', async (payload) => {
    try {
        const response = await certificationSubmit({ file: payload.file })
        return response;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    certificationImages: [],
    loading: false,
    error: null,
    message: ''
}

export const coachSlice = createSlice({
    name: 'coach',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(certificationSubmitAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(certificationSubmitAsync.fulfilled, (state, action) => {

            })
            .addCase(certificationSubmitAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
    }
})

export default coachSlice.reducer;