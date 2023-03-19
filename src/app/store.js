import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '~/features/adminSlice';
import guestReducer from '~/features/guestSlice';
import superAdminReducer from '~/features/superAdminSlice';
import userReducer from '~/features/userSlice';
import coachReducer from '~/features/coachSlice';
import chatSlice from '~/features/chatSlice';

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    coach: coachReducer,
    admin: adminReducer,
    chat: chatSlice,
    superAdmin: superAdminReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
