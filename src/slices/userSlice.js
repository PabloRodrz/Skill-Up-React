import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRegistered: {}
};

export const saveUserSlice = createSlice({
  name: 'saveUser',
  initialState,
  reducers: {
    saveUserInfo(state, { payload }) {
      state.userRegistered = payload
    }
  }
});

export const { saveUserInfo } = saveUserSlice.actions;

export default saveUserSlice.reducer;
