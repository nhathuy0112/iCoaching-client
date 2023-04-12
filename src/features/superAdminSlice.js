import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAdmins,
    register,
    updateStatus,
} from '~/services/superAdminService';



export const getAdminData = createAsyncThunk('superadmin/adminList', async ({ currentPage, pageSize, search }) => {
    try {
        const response = await getAdmins(currentPage, pageSize, search);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const updateAdminStatus = createAsyncThunk('superadmin/updateData', async (adminId) => {
    try {
        const response = await updateStatus(adminId);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const createAdmin = createAsyncThunk('superadmin/createAdmin', async (payload, { rejectWithValue }) => {
    try {
        const response = await register({
            email: payload.email,
            fullname: payload.fullname,
            phoneNumber: payload.phoneNumber,
            username: payload.username,
            password: payload.password,
            confirmPassword: payload.confirmPassword,
            note: payload.note
        });
        return response;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

const initialState = {
    data: [],
    admins: [],
    update: [],
    isLocked: false,
    currentPage: 1,
    pageSize: 5,
    search: '',
    adminId: '',
    count: '',
    avatar: null,
    message: '',
    error: null,
    status: false
};

export const superAdminSlice = createSlice({
    name: 'superadmin',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
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
            .addCase(getAdminData.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.count = action.payload.count;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(updateAdminStatus.fulfilled, (state, action) => {
                state.adminId = action.payload.adminId;
                state.isLocked = action.payload.isLocked;
                state.status = !state.status;
            })

            //create admin
            .addCase(createAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admins.push(action.payload);
                state.message = 'Thêm thành công';

            })
            .addCase(createAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = null
            })
    },
});

export const { setPage, setSearch, setLock } = superAdminSlice.actions;

export default superAdminSlice.reducer;
