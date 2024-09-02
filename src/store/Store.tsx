import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './Slice/NetworkSlice';
import signupReducer from './Slice/SignupSlice'
import loginReducer from './Slice/LoginSlice'

export const store = configureStore({
  reducer: {
    network: networkReducer,
    signup: signupReducer,
    login: loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
