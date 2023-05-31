import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { isDev } from "@result-system/shared/utility";

import { AUTH_FEATURE_KEY, authReducer } from "../features/auth/auth.slice";
import {
  LAYOUT_FEATURE_KEY,
  layoutReducer,
} from "../features/layout/layout.slice";
import { api } from "./services/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [AUTH_FEATURE_KEY]: authReducer,
    [LAYOUT_FEATURE_KEY]: layoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: isDev(),
  enhancers: [],
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
