import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/features/userSlice';
import guestReducer from '~/features/guestSlice';
import coachReducer from '~/features/coachSlice';
<<<<<<< HEAD
import adminReducer from '~/features/adminSlice'
=======
import superAdminSlice from '~/features/superAdminSlice';
>>>>>>> fd94aed4959cda68de3c895a34dfaa8f2eb30f47

const rootReducer = {
    user: userReducer,
    guest: guestReducer,
    coach: coachReducer,
<<<<<<< HEAD
    admin: adminReducer,
}
=======
    superadmin: superAdminSlice,
};
>>>>>>> fd94aed4959cda68de3c895a34dfaa8f2eb30f47

export const store = configureStore({
    reducer: rootReducer,
});
