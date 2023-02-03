import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';

const rootReducer = {
    user: userReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
