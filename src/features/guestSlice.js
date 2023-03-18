import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCoaches, getCoachProfile, getCoachTrainingCourses } from '~/services/guestService';

export const getAllCoachesAsync = createAsyncThunk('/guest/getAllCoaches', async (payload) => {
    try {
        const response = await getAllCoaches(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const getCoachProfileAsync = createAsyncThunk('/guest/getCoachProfile', async (payload) => {
    try {
        const response = await getCoachProfile(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const getCoachTrainingCourseAsync = createAsyncThunk('/guest/getCoachTrainingCourse', async (payload) => {
    try {
        const response = await getCoachTrainingCourses(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    coaches: [],
    currentCoach: {},
    trainingCourses: [],
    pageSize: 6,
    pageIndex: 1,
    totalCount: null,
    loading: false,
    error: null,
    message: '',
};

export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.pageIndex = action.payload;
        },
    },
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
                state.pageSize = action.payload.pageSize;
                state.pageIndex = action.payload.pageIndex;
                state.totalCount = action.payload.count;
            })
            .addCase(getAllCoachesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get coach profile
            .addCase(getCoachProfileAsync.pending, (state) => {
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

            //get coach training course
            .addCase(getCoachTrainingCourseAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCoachTrainingCourseAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.trainingCourses = action.payload.data;
            })
            .addCase(getCoachTrainingCourseAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setPage } = guestSlice.actions;

export default guestSlice.reducer;
