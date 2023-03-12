import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '~/features/adminSlice';
import guestReducer from '~/features/guestSlice';
import superAdminReducer from '~/features/superAdminSlice';
import userReducer from '~/features/userSlice';
import coachReducer from '~/features/coachSlice';

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    coach: coachReducer,
    admin: adminReducer,
    superAdmin: superAdminReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
