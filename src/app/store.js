import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '~/features/adminSlice';
import guestReducer from '~/features/guestSlice';
import superAdminReducer from '~/features/superAdminSlice';
import userReducer from '~/features/userSlice';
import coachReducer from '~/features/coachSlice';
import clientReducer from '~/features/clientSlice';
import contractReducer from '~/features/contractSlice';
import chatSlice from '~/features/chatSlice';

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    client: clientReducer,
    coach: coachReducer,
    admin: adminReducer,
    chat: chatSlice,
    superAdmin: superAdminReducer,
    contract: contractReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
