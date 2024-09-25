import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username: '',
    email: '',
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { username, email } = action.payload;
            state.username = username;
            state.email = email;
        },
        removeUser(state) {
            state.username = '';
            state.email = '';
        }
    },
});


export const { setUser, removeUser } = slice.actions;

export default slice.reducer;