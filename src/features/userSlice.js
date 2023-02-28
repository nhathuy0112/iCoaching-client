import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgot, getUserProfile, login, logout, refresh, register } from '~/services/userService';
import { parseJwt } from '~/utils/jwt';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '~/utils/localStorage';

export const registerAsync = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
    try {
        const response = await register({
            email: payload.email,
            fullname: payload.fullname,
            dob: payload.dob,
            gender: payload.gender,
            phoneNumber: payload.phoneNumber,
            username: payload.username,
            password: payload.password,
            confirmPassword: payload.confirmPassword,
            isCoach: payload.isCoach,
        });
        return response;
    } catch (error) {
        console.log(error);
        // throw error;
        return rejectWithValue(error);
    }
});

export const loginAsync = createAsyncThunk('user/login', async (payload) => {
    try {
        const response = await login({ username: payload.username, password: payload.password });
        setLocalStorage('auth', response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const refreshAsync = createAsyncThunk('user/refresh', async (payload) => {
    try {
        const response = await refresh({ accessToken: payload.accessToken, refreshToken: payload.refreshToken });
        setLocalStorage('auth', response);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const logoutAsync = createAsyncThunk('user/logout', async (payload) => {
    try {
        await logout({ currentRefreshToken: payload.currentRefreshToken });
    } catch (error) {
        console.log(error);
    }
    removeLocalStorage('auth');
});

export const forgotAsync = createAsyncThunk('user/forgot', async (payload) => {
    try {
        const response = await forgot(payload);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getUserProfileAsync = createAsyncThunk('user/getUserProfile', async () => {
    try {
        const response = await getUserProfile();
        return response;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    isLoggedIn: getLocalStorage('auth') ? true : false,
    users: [],
    currentUser: getLocalStorage('auth') ? parseJwt(getLocalStorage('auth').accessToken) : null,
    isVerified: false,
    loading: false,
    error: null,
    message: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.loading = false;
            state.error = null;
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(registerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.message = 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản'
                state.error = null;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // console.log(action);
            })

            //login
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                const authData = parseJwt(action.payload.accessToken);
                state.currentUser = authData;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //refresh
            .addCase(refreshAsync.fulfilled, (state) => {
                state.isLoggedIn = true;
                state.currentUser = parseJwt(getLocalStorage('auth').accessToken);
            })

            //logout
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.currentUser = null;
            })

            //forgot
            .addCase(forgotAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotAsync.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(forgotAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //profile
            .addCase(getUserProfileAsync.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfileAsync.fulfilled, (state, action) => {
                state.isVerified = action.payload.isVerified;
            })
            .addCase(getUserProfileAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
    },
});

export const { resetAuth } = userSlice.actions;

export default userSlice.reducer;
