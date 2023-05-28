import { API_ROUTE, RegisterInput } from "@result-system/shared/utility";

import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<
      string,
      RegisterInput & { avatar?: File | null }
    >({
      query(body) {
        const form = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value) {
            form.append(key, value);
          }
        });
        return {
          url: `${API_ROUTE.auth.main}${API_ROUTE.auth.registerUser}`,
          method: "POST",
          body: form,
        };
      },
    }),
  }),
});

export const { useCreateUserMutation } = usersApi;

export default usersApi;
