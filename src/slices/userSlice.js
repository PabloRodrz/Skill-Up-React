import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: {
    id: 0,
    createdAt: 0
  }
};

export const saveUserSlice = createSlice({
  name: 'saveUser',
  initialState,
  reducers: {
    saveUserInfo(state, { payload }) {
      console.log(payload)
      state.id = payload.id
      state.createdAt = payload.createdAt
    }
  }
});

export const { saveUserInfo } = saveUserSlice.actions;

export default saveUserSlice.reducer;
