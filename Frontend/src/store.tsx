// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../src/app/auth/authSlice";
import expireTransform from "./app/middleware/transform";
import formReducer from "./app/LoanAppliation/FormSlice";
import documentReducer from "./app/LoanAppliation/DocumentSlice";
const persistConfig = {
  key: "root",
  storage,
  transforms: [expireTransform], // Use the custom transform
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    form: formReducer,
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
