import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';
import guestReducer from '~/features/guestSlice';
import coachReducer from '~/features/coachSlice';
import superAdminSlice from '~/features/superAdminSlice';

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    coach: coachReducer,
    superadmin: superAdminSlice,
};

export const store = configureStore({
    reducer: rootReducer,
});
