import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';
import guestReducer from '~/features/guestSlice';
import coachReducer from '~/features/coachSlice';
import adminReducer from '~/features/adminSlice'
import superAdminSlice from '~/features/superAdminSlice';

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    coach: coachReducer,
    admin: adminReducer,
    superadmin: superAdminSlice,

};

export const store = configureStore({
    reducer: rootReducer,
});
