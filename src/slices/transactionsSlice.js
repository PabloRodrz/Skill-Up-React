import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  nextPage: null,
  previousPage: null,
  error: false,
  success: false,
  loading: false,
  message: '',
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      state.data = action.payload.data
      state.nextPage = action.payload.nextPage
      state.previousPage = action.payload.previousPage
    },
    responseStatus: (state, action) => {
      /*  state.error: false,
         state.success: false,
           state.loading: false,
             state.message: '' */
    }
  },
})

export const { getTransactions, responseStatus } = transactionsSlice.actions
export default transactionsSlice.reducer
