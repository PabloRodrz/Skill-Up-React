import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  transactionPage: 1,
  previousPage: null,
  nextPage: null,
  success: false,
  error: false,
  loading: false,
  totalExpending: 0,
  expenses: 0,
  moneyTransferred: 0
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
    cleanTransactions: (state) => {
      state.data = initialState.data
      state.transactionPage = initialState.transactionPage
      state.previousPage = initialState.previousPage
      state.nextPage = initialState.nextPage
      state.success = initialState.success
      state.error = initialState.error
      state.loading = initialState.loading
      state.totalExpending = initialState.totalExpending
      state.expenses = initialState.expenses
      state.moneyTransferred = initialState.moneyTransferred
    },
    changePage: (state, action) => {
      state.transactionPage = action.payload
    },
    changeStatus: (state, action) => {
      state.success = action.payload.success
      state.error = action.payload.error
      state.loading = action.payload.loading
    },
    changeExpenses: (state, action) => {
      if (action.payload.totalExpending) { state.totalExpending = action.payload.totalExpending }

      if (action.payload.expenses) {
        state.expenses = action.payload.expenses
      }

      if (action.payload.moneyTransferred) {
        state.moneyTransferred = action.payload.moneyTransferred
      }
    },
  }
})

export const { getTransactions, cleanTransactions, changePage, changeStatus, changeExpenses } = transactionsSlice.actions
export default transactionsSlice.reducer
