import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//armar slice, meterlo en el store, dispatch, selector y probar que todo funcione
//setear darkmode
//preg en la meeting como manejar el requirement de la fecha.
export const getDataFromAPI = createAsyncThunk(
  'user/postUser',
  async (user) => {
    return await postUserToAPI(user).then((res) => console.log(res));
  }
);

const initialState = {
  loading: false,
  success: false,
  error: false,
};

export const formSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    handleAPISuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataFromAPI.pending, (state) => {
      state.success = true;
    });
    builder.addCase(getDataFromAPI.fulfilled, (state) => {
      (state.loading = false),
        (state.success = true),
        (state.error = false);
    });
    builder.addCase(getDataFromAPI.rejected, (state) => {
      (state.loading = false),
        (state.success = false),
        (state.error = true);
    });
  },
});

export const { handleAPISuccess } = formSlice.actions;

export default formSlice.reducer;
