import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMoney } from '../services/accountsService';


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
  userAccount: []
};

export const accountsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    ChangeStatus: (state, { payload }) => {
      state.loading = payload.loading
      state.success = payload.success
      state.error = payload.error
    },
    saveUserAccount(state, {payload}){
      console.log("Save user account payload: " + payload)
      state.userAccount = payload
    }
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

export const { ChangeStatus, saveUserAccount } = accountsSlice.actions;
export default accountsSlice.reducer;
