import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMoney } from '../services/accountsService';

export const createAccountThunk = createAsyncThunk(
  'user/createAccountAPI',
  async (postData) => {

    return await createAccount(postData)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        if (e.status === 401) {
          Swal.fire(
            'Oops!',
            'You are unauthorized',
            'error'
          );
        }
        if (e.status === 403) {
          Swal.fire(
            'Oops!',
            'Forbiden access',
            'error'
          );
        }
        if (e.status === 500) {
          Swal.fire(
            'Oops!',
            'Internal server error. Try again later!',
            'error'
          );
        }
      });
  }
);



export const addMoneyPostAPI = createAsyncThunk(
  'user/addMoneyPostAPI',
  async (postData) => {
    return await addMoney(
      postData.postData,
      postData.accountId,
      postData.token
    )
      .then((res) => {
      }).catch(e => {})
  }
);

const initialState = {
  loading: false,
  success: false,
  error: false,
};

export const accountsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    ChangeStatus: (state, { payload }) => {
      state.loading = payload.loading
      state.success = payload.success
      state.error = payload.error
    }
  },
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

export const { ChangeStatus } = accountsSlice.actions;
export default accountsSlice.reducer;
