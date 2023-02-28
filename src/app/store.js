import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';
import coachReducer from '~/features/coachSlice';

const rootReducer = {
    user: userReducer,
    coach: coachReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
