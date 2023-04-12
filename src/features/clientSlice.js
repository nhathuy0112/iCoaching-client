import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    cancelTrainingRequest,
    completedContract,
    getAllVouchers,
    getCoachingRequests,
    getPaymentLink,
    getTrainingCourses,
    sendCoachingRequest,
} from '~/services/clientService';

export const sendCoachingRequestAsync = createAsyncThunk(
    'client/sendCoachingRequest',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await sendCoachingRequest(payload);
            return response;
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

export const cancelTrainingRequestAsync = createAsyncThunk('client/cancelRequest', async (payload) => {
    try {
        const response = await cancelTrainingRequest(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//get payment link
export const getPaymentLinkAsync = createAsyncThunk('client/getPaymentLink', async (requestId) => {
    try {
        const response = await getPaymentLink(requestId);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//complete contract
export const completedContractAsync = createAsyncThunk('coach/completedContract', async (contractId) => {
    try {
        const response = await completedContract(contractId);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//get all vouchers
export const getAllVouchersAsync = createAsyncThunk('coach/getAllVouchers', async () => {
    try {
        const response = await getAllVouchers();
        return response;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    coachingRequests: [],
    trainingCourses: [],
    vouchers: [],
    paymentLink: '',
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
                state.loading = false;
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
                state.totalCount = action.payload.count;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(getCoachingRequestsAsync.rejected, (state, action) => {
                state.loading = false;
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
                state.totalCount = action.payload.count;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(getTrainingCoursesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //cancel coaching request
            .addCase(cancelTrainingRequestAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(cancelTrainingRequestAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(cancelTrainingRequestAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get payment link
            .addCase(getPaymentLinkAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getPaymentLinkAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentLink = action.payload;
            })
            .addCase(getPaymentLinkAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //complete contract
            .addCase(completedContractAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(completedContractAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(completedContractAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get all vouchers
            .addCase(getAllVouchersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getAllVouchersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.vouchers = action.payload;
            })
            .addCase(getAllVouchersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetError } = clientSlice.actions;

export default clientSlice.reducer;
