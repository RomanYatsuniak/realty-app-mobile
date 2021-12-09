import {createSlice} from '@reduxjs/toolkit';

interface UserState {
    user: {};
    isLoading: boolean;
    error: string;
    isAuth: boolean;
}

const initialState: UserState = {
    user: {},
    isLoading: false,
    error: '',
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authUser(state) {
            state.isAuth = true
        }
    },
});

export const {authUser} = userSlice.actions;

export default userSlice.reducer;
