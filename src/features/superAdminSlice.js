import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAdmins,
    register,
    updateStatus,
    updateProfile,
    getUserAvatar,
    postUserAvatar,
} from '~/services/superAdminService';

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
};

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

export const createAdmin = createAsyncThunk('superadmin/createAdmin', async (payload) => {
    try {
        const response = await register({
            email: payload.email,
            fullname: payload.fullname,
            username: payload.username,
            password: payload.password,
            confirmPassword: payload.confirmPassword,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const updateUser = createAsyncThunk('superadmin/updateProfile', async (payload) => {
    try {
        const response = await updateProfile({
            email: payload.email,
            fullname: payload.fullname,
            dob: payload.dob,
            gender: payload.gender,
            phoneNumber: payload.phoneNumber,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const getCurrentUserAvatar = createAsyncThunk('superadmin/getAvatar', async () => {
    try {
        const response = await getUserAvatar();
        return response.url;
    } catch (error) {
        console.log(error);
    }
});

export const updateCurrentUserAvatar = createAsyncThunk('superadmin/updateAvatar', async (data) => {
    try {
        const formData = new FormData();
        formData.append('file', data);
        const response = await postUserAvatar(formData);
        return response;
    } catch (error) {
        console.log(error);
    }
});

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
            })
            .addCase(updateAdminStatus.fulfilled, (state, action) => {
                state.adminId = action.payload.adminId;
                state.isLocked = action.payload.isLocked;
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.admins.push(action.payload);
            })
            .addCase(getCurrentUserAvatar.fulfilled, (state, action) => {
                state.avatar = action.payload;
            })
            .addCase(updateCurrentUserAvatar.fulfilled, (state, action) => {
                console.log(action.payload);
                state.avatar = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log(action);
                state.update.push(action.payload);
            });
    },
});

export const { setPage, setSearch, setLock, setImage } = superAdminSlice.actions;

export default superAdminSlice.reducer;
