import _ from "lodash";

import {
  API_ROUTE,
  LoginInput,
  SuccessResponse,
  isDev,
} from "@result-system/shared/utility";

import { authActions } from "../../features/auth/auth.slice";
import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      SuccessResponse<{
        accessToken: string;
      }>,
      LoginInput
    >({
      query(body) {
        return {
          url: `${API_ROUTE.auth.main}${API_ROUTE.auth.loginUser}`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    logout: build.mutation({
      query() {
        return {
          url: `${API_ROUTE.auth.main}${API_ROUTE.auth.logoutUser}`,
          method: "POST",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authActions.setAuthInitial());
        } catch (error) {
          isDev() && console.log("authApi@logout:", error);
        }
      },
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    refreshToken: build.query<
      SuccessResponse<{
        accessToken: string;
      }>,
      unknown
    >({
      query: () => ({
        url: `${API_ROUTE.auth.main}${API_ROUTE.auth.token}`,
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(authActions.setAuthState(data.accessToken));
        } catch (error) {
          isDev() && console.log("authApi@refreshToken:", error);
        }
      },
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useLazyRefreshTokenQuery } =
  authApi;

export default authApi;
