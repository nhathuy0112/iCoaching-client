import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgot, login, logout, refresh, register } from '~/services/userService';
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
        throw new Error('Email này đã tồn tại');
        // return rejectWithValue({
        //     name: 'email Existed',
        //     message: 'Email này đã tồn tại',

        // });
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
        await forgot(payload);
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    isLoggedIn: getLocalStorage('auth') ? true : false,
    users: [],
    currentUser: getLocalStorage('auth') ? parseJwt(getLocalStorage('auth').accessToken) : null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.loading = false;
            state.error = null;
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
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
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
                if (state.isLoggedIn) {
                    state.currentUser = authData;
                }
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
            .addCase(forgotAsync.fulfilled, (state) => state)
            .addCase(forgotAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
    },
});

export const { resetAuth } = userSlice.actions;

export default userSlice.reducer;
