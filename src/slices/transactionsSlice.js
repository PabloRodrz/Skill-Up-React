import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  transactionPage: 1,
  previousPage: null,
  nextPage: null,
  success: false,
  error: false,
  loading: false
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
    cleanTransactions: () => {
      state = initialState
    },
    changePage: (state, action) => {
      state.transactionPage = action.payload
    },
    changeStatus: (state, action) => {
      state.success = action.payload.success
      state.error = action.payload.error
      state.loading = action.payload.loading
    }
  }
})

export const { getTransactions, cleanTransactions, changePage, changeStatus } = transactionsSlice.actions
export default transactionsSlice.reducer
