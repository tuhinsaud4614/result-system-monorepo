import {
  API_ROUTE,
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
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;

export default authApi;
