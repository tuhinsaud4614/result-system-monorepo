import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import _ from "lodash";

import {
  type AuthorizedUser,
  isObjectWithKeys,
} from "@result-system/shared/utility";

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
    setAuthState(state, action: PayloadAction<string>) {
      const decoded = jwt_decode(action.payload);
      if (
        isObjectWithKeys<AuthorizedUser & { exp: number; iat: number }>(
          decoded,
          [
            "id",
            "username",
            "firstName",
            "lastName",
            "role",
            "avatar",
            "exp",
            "iat",
          ],
        )
      ) {
        state.user = _.omit(decoded, ["exp", "iat"]);
        state.token = action.payload;
      }
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

export const getAuthUserRole = (rootState: RootState) => {
  const user = rootState[AUTH_FEATURE_KEY].user;
  return user && user.role;
};

export const getAuthToken = (rootState: RootState) =>
  rootState[AUTH_FEATURE_KEY].token;
