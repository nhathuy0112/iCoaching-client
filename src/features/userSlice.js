import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgot, login, logout, refresh, register } from '~/services/userService';
import { parseJwt } from '~/utils/jwt';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '~/utils/localStorage';

export const registerAsync = createAsyncThunk('user/register', async (payload) => {
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
    }
});

export const loginAsync = createAsyncThunk('user/login', async (payload) => {
    try {
        const response = await login({ username: payload.username, password: payload.password });
        setLocalStorage('auth', response);
        return response;
    } catch (error) {
        return { error: error.message };
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
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            //login
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                const authData = parseJwt(action.payload.accessToken);
                if (state.isLoggedIn) {
                    state.currentUser = authData;
                    state.errorMessage = action.payload?.message;
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })

            //refresh
            .addCase(refreshAsync.fulfilled, (state) => {
                state.isLoggedIn = true;
                state.currentUser = parseJwt(getLocalStorage('auth').accessToken);
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.currentUser = null;
            })
            .addCase(forgotAsync.fulfilled, (state) => state);
    },
});

export default userSlice.reducer;
