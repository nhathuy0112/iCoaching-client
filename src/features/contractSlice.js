import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    deleteContractProgramFile,
    getContractDetails,
    getContractLogs,
    getContractProgramFiles,
    getProgramFileDownload,
    uploadContractProgramFiles,
} from '~/services/contractService';

//get contract details
export const getContractDetailsAsync = createAsyncThunk('contract/getContractDetails', async (id) => {
    try {
        const response = await getContractDetails(id);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//upload contract program files
export const uploadContractProgramFilesAsync = createAsyncThunk(
    'contract/uploadContractProgramFiles',
    async (payload) => {
        try {
            const response = await uploadContractProgramFiles(payload);
            if (response) {
                toast.success('Thêm tài nguyên thành công!');
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    },
);

//get contract program files
export const getContractProgramFilesAsync = createAsyncThunk('contract/getContractProgramFiles', async (id) => {
    try {
        const response = await getContractProgramFiles(id);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//delete contract program file
export const deleteContractProgramFileAsync = createAsyncThunk(
    'contract/deleteContractProgramFile',
    async (payload) => {
        try {
            const response = await deleteContractProgramFile(payload);
            if (response) {
                toast.success('Xóa tài nguyên thành công!');
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    },
);

//get program file download
export const getProgramFileDownloadAsync = createAsyncThunk('contract/getProgramFileDownload', async (payload) => {
    try {
        const response = await getProgramFileDownload(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//get contract logs
export const getContractLogsAsync = createAsyncThunk('contract/getContractLogs', async (id) => {
    try {
        const response = await getContractLogs(id);
        return response;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    currentContract: {},
    programFiles: [],
    linkDownload: '',
    logs: [],
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
            })

            //upload contract program files
            .addCase(uploadContractProgramFilesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(uploadContractProgramFilesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(uploadContractProgramFilesAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get contract program files
            .addCase(getContractProgramFilesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getContractProgramFilesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.programFiles = action.payload;
            })
            .addCase(getContractProgramFilesAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //delete contract program files
            .addCase(deleteContractProgramFileAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(deleteContractProgramFileAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteContractProgramFileAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get program file download
            .addCase(getProgramFileDownloadAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getProgramFileDownloadAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.linkDownload = action.payload;
            })
            .addCase(getProgramFileDownloadAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get contract logs
            .addCase(getContractLogsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getContractLogsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = action.payload;
            })
            .addCase(getContractLogsAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            });
    },
});

export default contractSlice.reducer;