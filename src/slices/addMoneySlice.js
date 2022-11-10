import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import topUpMoney from '../services/topUpService';
import Swal from 'sweetalert2';

export const addMoneyPostAPI = createAsyncThunk(
  'user/addMoneyPostAPI',
  async (postData) => {
    return await topUpMoney(
      postData.postData,
      postData.accountId,
      postData.accessToken
    )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire('', 'Deposit done!', 'success');
        }
      })
      .catch((e) => {
        if (res.status === 400) {
          Swal.fire('Oops!', 'Not enough cash :(', 'error');
        }
        if (res.status === 401) {
          Swal.fire(
            'Oops!',
            'You are unauthorized to do this transaction',
            'error'
          );
        }
        if (res.status === 403) {
          Swal.fire(
            'Oops!',
            'Source account or destination account blocked',
            'error'
          );
        }
        if (res.status === 404) {
          Swal.fire('Oops!', 'The account was not found', 'error');
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

export const addMoneySlice = createSlice({
  name: 'addMoney',
  initialState,
  reducers: {
    clearApiSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMoneyPostAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMoneyPostAPI.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(addMoneyPostAPI.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export const { clearApiSuccess } = addMoneySlice.actions;

export default addMoneySlice.reducer;
