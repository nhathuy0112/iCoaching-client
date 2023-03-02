import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';
import guestReducer from '~/features/guestSlice';
import coachReducer from '~/features/coachSlice';
import adminReducer from '~/features/adminSlice'

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    coach: coachReducer,
    admin: adminReducer,
}

export const store = configureStore({
    reducer: rootReducer,
});
