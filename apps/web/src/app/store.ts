import { configureStore } from "@reduxjs/toolkit";

import { isDev } from "@result-system/shared/utility";

import { AUTH_FEATURE_KEY, authReducer } from "../features/auth/auth.slice";
import { api } from "./services/api";

const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer, [AUTH_FEATURE_KEY]: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: isDev(),
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
