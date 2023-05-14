import { API_ROUTE, RegisterInput } from "@result-system/shared/utility";

import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<string, RegisterInput & { avatar: File }>({
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
  }),
});

export const { useRegisterUserMutation } = authApi;

export default authApi;