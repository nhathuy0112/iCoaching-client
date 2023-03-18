import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    coachingRequests: [],
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
    extraReducers: (builder) => {},
});

export default clientSlice.reducer;
