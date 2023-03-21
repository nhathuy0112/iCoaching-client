import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getContractDetails } from '~/services/contractService';

export const getContractDetailsAsync = createAsyncThunk('contract/getContractDetails', async (id) => {
    try {
        const response = await getContractDetails(id);
        return response;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    currentContract: {},
    loading: false,
    error: null,
    message: '',
};

export const contractSlice = createSlice({
    name: 'contract',
    initialState,

    extraReducers: (builder) => {
        builder
            //get contract details
            .addCase(getContractDetailsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getContractDetailsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentContract = action.payload;
            })
            .addCase(getContractDetailsAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            });
    },
});

export default contractSlice.reducer;
