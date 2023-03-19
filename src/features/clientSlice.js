import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getCoachingRequests, getTrainingCourses, sendCoachingRequest } from '~/services/clientService';

export const sendCoachingRequestAsync = createAsyncThunk(
    'client/sendCoachingRequest',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await sendCoachingRequest({
                coachId: payload.coachId,
                courseId: payload.courseId,
                data: payload.data,
            });
            if (response) {
                toast.success('Yêu cầu tập luyện thành công!');
                return response;
            }
            // return response;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    },
);

export const getCoachingRequestsAsync = createAsyncThunk('client/getCoachingRequests', async (payload) => {
    try {
        const response = await getCoachingRequests(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const getTrainingCoursesAsync = createAsyncThunk('client/getTrainingCourses', async (payload) => {
    try {
        const response = await getTrainingCourses(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    coachingRequests: [],
    trainingCourses: [],
    pageSize: 6,
    pageIndex: 1,
    totalCount: null,
    loading: false,
    error: null,
    message: '',
    status: null,
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        resetError: (state) => {
            state.loading = false;
            state.error = null;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendCoachingRequestAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(sendCoachingRequestAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(sendCoachingRequestAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            })

            //get coaching request
            .addCase(getCoachingRequestsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getCoachingRequestsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.coachingRequests = action.payload.data;
            })
            .addCase(getCoachingRequestsAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get training courses
            .addCase(getTrainingCoursesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getTrainingCoursesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.trainingCourses = action.payload.data;
            })
            .addCase(getTrainingCoursesAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            });
    },
});

export const { resetError } = clientSlice.actions;

export default clientSlice.reducer;
