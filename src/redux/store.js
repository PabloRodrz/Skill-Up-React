import { configureStore } from '@reduxjs/toolkit';
import addMoney from '../slices/addMoneySlice';
import authReducer from '../slices/authSlice';
import transactionsReducer from '../slices/transactionsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    addMoney: addMoney,
  },
});
