import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  nextPage: null,
  previousPage: null,
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      state.data = action.payload.data
      state.nextPage = action.payload.nextPage
      state.previousPage = action.payload.previousPage
    }
  },
})

export const { getTransactions, responseStatus } = transactionsSlice.actions
export default transactionsSlice.reducer
