import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllCoaches, getCoachProfile } from '~/services/guestService';

export const getAllCoachesAsync = createAsyncThunk('/guest/getAllCoaches', async (payload) => {
    try {
        const response = await getAllCoaches(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
})

export const getCoachProfileAsync = createAsyncThunk('/guest/getCoachProfile', async (payload) => {
    try {
        const response = await getCoachProfile(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    coaches: [],
    currentCoach: {},
    loading: false,
    error: null,
    message: ''
}

export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    extraReducers: (builder) => {
        builder
            //get all coaches
            .addCase(getAllCoachesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCoachesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.coaches = action.payload.data;
            })
            .addCase(getAllCoachesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get coach profile
            .addCase(getCoachProfileAsync.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCoachProfileAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCoach = action.payload;
            })
            .addCase(getCoachProfileAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default guestSlice.reducer;