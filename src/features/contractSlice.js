import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    deleteContractProgramFile,
    getContractDetails,
    getContractLogDetails,
    getContractLogs,
    getContractProgramFiles,
    getProgramFileDownload,
    updateContractLog,
    uploadContractProgramFiles,
    sendReport,
    deleteContractLogMedia,
    getContractReports,
} from '~/services/contractService';

//get contract details
export const getContractDetailsAsync = createAsyncThunk(
    'contract/getContractDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getContractDetails(id);
            return response;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    },
);

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
            return response;
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

//update contract log
export const updateContractLogAsync = createAsyncThunk('contract/updateContractLog', async (payload) => {
    try {
        const response = await updateContractLog(payload);
        if (response) {
            toast.success('Cập nhật tiến độ thành công!');
            return response;
        }
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

//get contract logs
export const getContractLogDetailsAsync = createAsyncThunk('contract/getContractLogDetails', async (payload) => {
    try {
        const response = await getContractLogDetails(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//send report
export const sendReportAsync = createAsyncThunk('contract/sendReport', async (payload, { rejectWithValue }) => {
    try {
        const response = await sendReport({
            contractId: payload.contractId,
            data: payload.formData,
        });
        if (response) {
            toast.success('Khiếu nại thành công!');
            return response;
        }
        // return response;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

//delete media in log
export const deleteContractLogMediaAsync = createAsyncThunk('contract/deleteContractLogMedia', async (payload) => {
    try {
        const response = await deleteContractLogMedia(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});


//get contract reports
export const getContractReportsAsync = createAsyncThunk('contract/getContractReports', async (payload) => {
    try {
        const response = await getContractReports(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    currentContract: {},
    programFiles: [],
    downloadLink: '',
    logs: [],
    currentLog: {},
    reports: [],
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
                state.loading = false;
                state.error = action.payload;
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
                state.loading = false;
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
                state.loading = false;
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
                state.loading = false;
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
                state.downloadLink = action.payload;
            })
            .addCase(getProgramFileDownloadAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update contract log
            .addCase(updateContractLogAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(updateContractLogAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateContractLogAsync.rejected, (state, action) => {
                state.loading = false;
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
                state.loading = false;
                state.error = action.error.message;
            })

            //send report
            .addCase(sendReportAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(sendReportAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(sendReportAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get contract log details
            .addCase(getContractLogDetailsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getContractLogDetailsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentLog = action.payload;
            })
            .addCase(getContractLogDetailsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })



            //delete media in contract log
            .addCase(deleteContractLogMediaAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(deleteContractLogMediaAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteContractLogMediaAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get contract reports
            .addCase(getContractReportsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getContractReportsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload;
            })
            .addCase(getContractReportsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default contractSlice.reducer;
