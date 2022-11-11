import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createAccount from '../services/createAccount';
import Swal from 'sweetalert2';

export const createAccountThunk = createAsyncThunk(
  'user/createAccountAPI',
  async (postData) => {
    console.log("se ejecutó el thunk")
    return await createAccount(postData)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        if (res.status === 401) {
          Swal.fire(
            'Oops!',
            'You are unauthorized',
            'error'
          );
        }
        if (res.status === 403) {
          Swal.fire(
            'Oops!',
            'Forbiden access',
            'error'
          );
        }
        if (res.status === 500) {
          Swal.fire(
            'Oops!',
            'Internal server error. Try again later!',
            'error'
          );
        }
      });
  }
);

const initialState = {
  loading: false,
  success: false,
  error: false,
};

export const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createAccountThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccountThunk.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(createAccountThunk.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const {  } = createAccountSlice.actions;

export default createAccountSlice.reducer;
