import {
  API_ROUTE,
  ErrorResponse,
  LoginInput,
  RegisterInput,
  SuccessResponse,
  isDev,
} from "@result-system/shared/utility";

import { authActions } from "../../features/auth/auth.slice";
import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<string, RegisterInput & { avatar: File }>({
      query(body) {
        const form = new FormData();
        Object.entries(body).forEach(([key, value]) => form.append(key, value));
        return {
          url: `${API_ROUTE.auth.main}${API_ROUTE.auth.registerUser}`,
          method: "POST",
          body: form,
        };
      },
    }),
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
      transformErrorResponse(
        baseQueryReturnValue: { status: number; data: ErrorResponse },
        _meta,
        _args,
      ) {
        return baseQueryReturnValue.data;
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
          dispatch(api.util.resetApiState());
        } catch (error) {
          if (isDev()) {
            console.log(error);
          }
        }
      },
    }),
    refreshToken: build.query({
      query: () => ({
        url: `${API_ROUTE.auth.main}${API_ROUTE.auth.token}`,
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setAuthState(data as string));
        } catch (error) {
          if (isDev()) {
            console.log(error);
          }
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;

export default authApi;
