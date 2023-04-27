import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    forgot,
    getUserProfile,
    login,
    logout,
    refresh,
    register,
    getUserAvatar,
    updateUserProfile,
    updateUserAvatar,
} from '~/services/userService';
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
        removeLocalStorage('auth');
        const { successCallback } = payload;
        successCallback && successCallback();
    } catch (error) {
        console.log(error);
    }
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
});

export const updateUserProfileAsync = createAsyncThunk(
    'user/updateUserProfile',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await updateUserProfile(payload);
            return response;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    },
);

export const getUserAvatarAsync = createAsyncThunk('user/getUserAvatar', async () => {
    try {
        const response = await getUserAvatar();
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const updateUserAvatarAsync = createAsyncThunk('user/updateUserAvatar', async (payload) => {
    try {
        const response = await updateUserAvatar(payload);
        return response;
    } catch (error) {
        console.log(error);
        console.log(payload.value('file'));
    }
});

const initialState = {
    isLoggedIn: getLocalStorage('auth') ? true : false,
    users: [],
    currentUser: getLocalStorage('auth') ? parseJwt(getLocalStorage('auth').accessToken) : null,
    isVerified: false,
    loading: false,
    error: null,
    message: '',
    profile: {},
    avatar: '',
    status: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.loading = false;
            state.error = null;
            state.message = '';
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
                state.loading = false;
                state.message = 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản';
                state.error = null;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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
            // .addCase(refreshAsync.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(refreshAsync.fulfilled, (state, action) => {
            //     state.isLoggedIn = true;
            //     const authData = parseJwt(action.payload.accessToken);
            //     state.currentUser = authData;
            // })
            // .addCase(refreshAsync.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message;
            // })

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
                state.loading = false;
            })
            .addCase(forgotAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get profile
            .addCase(getUserProfileAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfileAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isVerified = action.payload.isVerified;
                state.profile = action.payload;
            })
            .addCase(getUserProfileAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update profile
            .addCase(updateUserProfileAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfileAsync.fulfilled, (state) => {
                state.loading = false;
                state.status = !state.status;
            })
            .addCase(updateUserProfileAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = null;
            })

            //get avatar
            .addCase(getUserAvatarAsync.pending, (state, action) => {
                state.error = null;
            })
            .addCase(getUserAvatarAsync.fulfilled, (state, action) => {
                state.avatar = action.payload;
            })
            .addCase(getUserAvatarAsync.rejected, (state, action) => {
                state.error = action.payload;
            })

            //update avatar
            .addCase(updateUserAvatarAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(updateUserAvatarAsync.fulfilled, (state, action) => {
                state.avatar = action.payload;
            })
            .addCase(updateUserAvatarAsync.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { resetAuth } = userSlice.actions;

export default userSlice.reducer;
