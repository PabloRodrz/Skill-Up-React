import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../slices/accountsSlice';
import authReducer from '../slices/authSlice';
import transactionsReducer from '../slices/transactionsSlice';

const LOCAL_STORAGE = JSON.parse(localStorage.getItem("alkybank_state")) ?? {}

const store = configureStore({
  preloadedState: LOCAL_STORAGE,
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    accounts: accountsReducer
  },
})

store.subscribe(() => {
  const STATE = JSON.stringify(store.getState());
  localStorage.setItem("alkybank_state", STATE);
});

export default store;
