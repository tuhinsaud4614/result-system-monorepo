import { configureStore } from "@reduxjs/toolkit";

import {
  SOMETHING_FEATURE_KEY,
  somethingReducer,
} from "../features/something.slice";

const store = configureStore({
  reducer: { [SOMETHING_FEATURE_KEY]: somethingReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  // Optional Redux store enhancers
  enhancers: [],
});

export default store;
