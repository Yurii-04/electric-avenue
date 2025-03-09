import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '~/redux/api/types';
import { RootState } from '~/redux/store';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.userState.user;
export const selectIsAuthenticated = (state: RootState) => !!state.userState.user;
