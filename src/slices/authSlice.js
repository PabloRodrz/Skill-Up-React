import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  token: null,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Reset: (state) => {
      state.user = initialState.user
      state.isError = initialState.isError
      state.isSuccess = initialState.isSuccess
      state.isLoading = initialState.isLoading
      state.token = initialState.token
      state.message = initialState.message
    },
    ChangeStatus: (state, { payload }) => {
      state.isError = payload.isError
      state.isSuccess = payload.isSuccess
      state.isLoading = payload.isLoading
      state.message = payload.message
    },
    LoginUser: (state, { payload }) => {
      state.user = payload.user
      state.token = payload.token
    }
  }
});

export const { Reset, ChangeStatus, LoginUser } = authSlice.actions;
export default authSlice.reducer;
