import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatId: 'null',
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
