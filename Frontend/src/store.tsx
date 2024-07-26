// // store.ts

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "../src/app/auth/authSlice";
// import expireTransform from "./app/middleware/transform";
// import formReducer from "./app/LoanAppliation/FormSlice";
// import documentReducer from "./app/LoanAppliation/DocumentSlice";
// import adminReducer from './app/admin/adminSlice'
// const persistConfig = {
//   key: "root",
//   storage,
//   transforms: [expireTransform], // Use the custom transform
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//     form: formReducer,
//     document: documentReducer,
//     admin:adminReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const persistor = persistStore(store);

// export default store;


// store.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/app/auth/authSlice";
import formReducer from "./app/LoanAppliation/FormSlice";
import documentReducer from "./app/LoanAppliation/DocumentSlice";
import adminReducer from './app/admin/adminSlice'
import verifyReducer from './app/auth/checkAuthSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    document: documentReducer,
    admin: adminReducer,
    verify:verifyReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
