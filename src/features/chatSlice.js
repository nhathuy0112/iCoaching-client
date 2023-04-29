import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase';

// export const updateUserOnlineStatus = createAsyncThunk('chat/updateOnlineStatus', async (userId) => {
//     const userDocRef = doc(db, 'users', userId);
//     await updateDoc(userDocRef, { isOnline: false });
//     return userId;
// });

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatId: '',
        user: {},
    },
    reducers: {
        changeUser: (state, action) => {
            const { currentUser, payload } = action.payload;
            if (payload.uid) {
                state.user = payload;
                state.chatId =
                    currentUser?.Id > payload.uid ? currentUser?.Id + payload.uid : payload.uid + currentUser?.Id;
            } else if (payload) {
                state.user = payload;
                state.chatId = currentUser?.Id > payload ? currentUser?.Id + payload : payload + currentUser?.Id;
            } else if (currentUser === '' && payload === '') {
                state.user = '';
                state.chatId = '';
            }
        },
    },
});

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;
