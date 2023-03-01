import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';
import guestReducer from '~/features/guestSlice';
import coachReducer from '~/features/coachSlice';

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    coach: coachReducer,
}

export const store = configureStore({
    reducer: rootReducer,
});
