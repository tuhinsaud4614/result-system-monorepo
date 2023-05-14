import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type AuthorizedUser } from "@result-system/shared/utility";

import { RootState } from "../../app/store";

export const AUTH_FEATURE_KEY = "auth";

export interface AuthState {
  user: AuthorizedUser | null;
  token: string | null;
}

export const initialAuthState: AuthState = { token: null, user: null };

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    setAuthState(
      state,
      action: PayloadAction<{ user: AuthorizedUser; token: string }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setAuthInitial(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export const getAuthState = (rootState: RootState): AuthState =>
  rootState[AUTH_FEATURE_KEY];

export const getAuthUser = (rootState: RootState) =>
  rootState[AUTH_FEATURE_KEY].user;

export const getAuthToken = (rootState: RootState) =>
  rootState[AUTH_FEATURE_KEY].token;
