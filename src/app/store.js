import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';
import guestReducer from '~/features/guestSlice';

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
