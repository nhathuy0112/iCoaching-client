import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllCoaches, updateStatus } from '~/services/adminService';

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

const initialState = {
    coaches: [],
    pageSize: 6,
    pageIndex: 1,
    totalCount: null,
    loading: false,
    error: null,
    message: '',
    isLocked: null
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
        setLock: (state, action) => {
            state.isLocked = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
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


            .addCase(updateStatusAsync.fulfilled, (state, action) => {
                state.coachId = action.payload.coachId;
                state.isLocked = action.payload.isLocked;
            })
    }
});

export const { setPage, setStatus } = adminSlice.actions;

export default adminSlice.reducer;
