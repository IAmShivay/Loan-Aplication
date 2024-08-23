import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/app/auth/authSlice";
import formReducer from "./app/LoanAppliation/FormSlice";
import documentReducer from "./app/LoanAppliation/DocumentSlice";
import adminReducer from "./app/admin/adminSlice";
import verifyReducer from "./app/auth/checkAuthSlice";
import userReducer from "./app/user/userSlice";
import snackbarReducer from './app/errors/errorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    document: documentReducer,
    admin: adminReducer,
    verify: verifyReducer,
    user:userReducer,
    snackbar: snackbarReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
