import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import transactionsReducer from "../slices/transactionsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer
  },
})
