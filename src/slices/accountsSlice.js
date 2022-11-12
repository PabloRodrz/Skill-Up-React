import { createSlice } from '@reduxjs/toolkit';

/* export const createAccountThunk = createAsyncThunk(
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
 */
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
  }
  /* extraReducers: (builder) => {
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
  }, */
});

export const { ChangeStatus } = accountsSlice.actions;
export default accountsSlice.reducer;
