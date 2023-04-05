import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllCoaches,
    updateStatus,
    warnCoach,
    getAllCertRequests,
    getCertRequestDetail,
    updateCertStatus,
    getAllReports,
    updateReport,
    createContract,
    createVoucher,
    updateContractStatus,
} from '~/services/adminService';

//get list coaches
export const getAllCoachesAsync = createAsyncThunk('/admin/getAllCoaches', async (payload) => {
    try {
        const response = await getAllCoaches(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//update coach account status
export const updateStatusAsync = createAsyncThunk('/admin/updateStatus', async (coachId) => {
    try {
        const response = await updateStatus(coachId);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//warning coach
export const warnCoachAsync = createAsyncThunk('/admin/warnCoach', async (coachId) => {
    try {
        const response = await warnCoach(coachId);
        if (response) {
            toast.success('Cảnh báo thành công');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
});

//get list certificate request
export const getAllCertRequestsAsync = createAsyncThunk('/admin/getAllCertRequests', async (payload) => {
    try {
        const response = await getAllCertRequests(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//get certificate detail
export const getCertRequestDetailAsync = createAsyncThunk('/admin/getCertRequestDetail', async (payload) => {
    try {
        const response = await getCertRequestDetail(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//update certificate status
export const updateCertStatusAsync = createAsyncThunk('/admin/updateCertStatus', async (payload) => {
    try {
        const response = await updateCertStatus({
            certId: payload.certId,
            option: payload.option,
            data: payload.reason,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
});

//get list reports
export const getAllReportsAsync = createAsyncThunk('/admin/getAllReports', async (payload) => {
    try {
        const response = await getAllReports(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//update report status
export const updateReportAsync = createAsyncThunk('/admin/updateReport', async (payload) => {
    try {
        const response = await updateReport({
            reportId: payload.reportId,
            option: payload.option,
            message: payload.message,
        });
        if (response) {
            toast.success('Đã cập nhật trạng thái khiếu nại');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
});

//create contract
export const createContractAsync = createAsyncThunk('/admin/createContract', async (payload) => {
    try {
        const response = await createContract({ reportId: payload.reportId, data: payload.contract });
        if (response) {
            toast.success('Tạo hợp đồng thành công');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
});

//create voucher
export const createVoucherAsync = createAsyncThunk('/admin/createVoucher', async (payload) => {
    try {
        const response = await createVoucher({
            reportId: payload.reportId,
            discount: payload.discount,
            data: payload.data,
        });
        if (response) {
            toast.success('Tạo mã giảm giá thành công');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
});

//update contract status
export const updateContractStatusAsync = createAsyncThunk('/admin/updateContractStatus', async (payload) => {
    try {
        const response = await updateContractStatus({
            reportId: payload.reportId,
            option: payload.option,
            data: payload.message,
        });
        if (response) {
            toast.success('Đã cập nhật trạng thái hợp đồng');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    coaches: [],
    certRequest: {},
    certId: null,
    reports: [],
    reportId: '',
    pageSize: 6,
    pageIndex: 1,
    totalCount: null,
    loading: false,
    error: null,
    message: '',
    status: false,
};

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
                state.status = !state.status;
                state.message = action.payload
            })

            //warn coach
            .addCase(warnCoachAsync.fulfilled, (state, action) => {
                state.status = !state.status;
                state.message = action.payload
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
            .addCase(getCertRequestDetailAsync.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCertRequestDetailAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.certRequest = action.payload;
                state.status = null;
            })
            .addCase(getCertRequestDetailAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update certificate verification request detail
            .addCase(updateCertStatusAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateCertStatusAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
                state.status = action.payload.status;
            })
            .addCase(updateCertStatusAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get all reports pending
            .addCase(getAllReportsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllReportsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload.data;
                state.pageSize = action.payload.pageSize;
                state.pageIndex = action.payload.pageIndex;
                state.totalCount = action.payload.count;
            })
            .addCase(getAllReportsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update report status
            .addCase(updateReportAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateReportAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateReportAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create new contract
            .addCase(createContractAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createContractAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createContractAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create voucher
            .addCase(createVoucherAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createVoucherAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createVoucherAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update contract status
            .addCase(updateContractStatusAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateContractStatusAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateContractStatusAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setPage, setStatus } = adminSlice.actions;

export default adminSlice.reducer;
