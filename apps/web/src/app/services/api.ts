import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { API_ROUTE } from "@result-system/shared/utility";

import { AUTH_FEATURE_KEY, authActions } from "../../features/auth/auth.slice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_APP_API}${API_ROUTE.v1}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)[AUTH_FEATURE_KEY].token;
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log("baseQueryWithAuth - Result:", result);

  if (result.error && result.error.status === 401) {
    const newToken = await baseQuery(
      `${API_ROUTE.auth.main}${API_ROUTE.auth.token}`,
      api,
      extraOptions,
    );

    console.log("new Token", newToken);
  } else {
    api.dispatch(authActions.setAuthInitial());
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
