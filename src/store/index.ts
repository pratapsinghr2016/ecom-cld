import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "../slices/productListSlice";

export const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
