import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllCoaches, updateStatus, getAllCertRequests, getCertRequestDetail, updateCertStatus } from '~/services/adminService';

export const getAllCoachesAsync = createAsyncThunk('/admin/getAllCoaches', async (payload) => {
    try {
        const response = await getAllCoaches(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
})

export const updateStatusAsync = createAsyncThunk('/admin/updateStatus', async (coachId) => {
    try {
        const response = await updateStatus(coachId);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const getAllCertRequestsAsync = createAsyncThunk('/admin/getAllCertRequests', async (payload) => {
    try {
        const response = await getAllCertRequests(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
})

export const getCertRequestDetailAsync = createAsyncThunk('/admin/getCertRequestDetail', async (payload) => {
    try {
        const response = await getCertRequestDetail(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const updateCertStatusAsync = createAsyncThunk('/admin/updateCertStatus', async (payload) => {
    try {
        const response = await updateCertStatus({ certId: payload.certId, option: payload.option, data: payload.reason });
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
})


const initialState = {
    coaches: [],
    certRequest: {},
    certId: null,
    pageSize: 6,
    pageIndex: 1,
    totalCount: null,
    loading: false,
    error: null,
    message: '',
    status: false
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.pageIndex = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            state.currentPage = 1;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
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

            //update coach status
            .addCase(updateStatusAsync.fulfilled, (state, action) => {
                state.status = action.payload;
            })

            //get all certificate verification requests
            .addCase(getAllCertRequestsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCertRequestsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.coaches = action.payload.data;
                state.pageSize = action.payload.pageSize;
                state.pageIndex = action.payload.pageIndex;
                state.totalCount = action.payload.count;
            })
            .addCase(getAllCertRequestsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get certificate verification request detail
            .addCase(getCertRequestDetailAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.certRequest = action.payload;
            })

            //update certificate verification request detail
            .addCase(updateCertStatusAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateCertStatusAsync.fulfilled, (state, action) => {
                state.message = action.payload;
                state.status = action.payload.status
            })
            .addCase(updateCertStatusAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});

export const { setPage, setStatus } = adminSlice.actions;

export default adminSlice.reducer;
