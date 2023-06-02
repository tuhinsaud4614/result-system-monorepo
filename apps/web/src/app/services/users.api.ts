import _ from "lodash";

import {
  API_ROUTE,
  IDParams,
  LeanUserWithAvatar,
  OffsetQuery,
  RegisterInput,
  ResultWithOffset,
  SuccessResponse,
  UpdateUserInput,
} from "@result-system/shared/utility";

import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<
      SuccessResponse<ResultWithOffset<LeanUserWithAvatar>>,
      OffsetQuery
    >({
      query: (offsetQuery) => {
        const { limit, page } = offsetQuery;
        const q = limit && page ? `?page=${page}&limit=${limit}` : "";
        return {
          url: `${API_ROUTE.admin.main}${API_ROUTE.admin.users}${q}`,
          method: "GET",
        };
      },
      providesTags: (users, _error, _arg) => {
        if (users) {
          return [
            { type: "User", id: "LIST" },
            ...users.data.data.map(({ id }) => ({ type: "User" as const, id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    getUser: build.query<SuccessResponse<LeanUserWithAvatar>, IDParams["id"]>({
      query: (id) => {
        return {
          url: `${API_ROUTE.admin.main}${API_ROUTE.admin.user.dynamic(id)}`,
          method: "GET",
        };
      },
      providesTags: (_user, _error, arg) => {
        return [{ type: "User", id: arg }];
      },
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    createUser: build.mutation<
      string,
      RegisterInput & { avatar?: File | null }
    >({
      query(body) {
        const form = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value) {
            if (
              (key === "firstName" || key === "lastName") &&
              typeof value === "string"
            ) {
              value = value.trim().replace(/\s+/g, " ");
            }
            form.append(key, value);
          }
        });
        return {
          url: `${API_ROUTE.auth.main}${API_ROUTE.auth.registerUser}`,
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    updateUser: build.mutation<
      SuccessResponse<LeanUserWithAvatar>,
      { id: IDParams["id"]; inputs: UpdateUserInput & { avatar?: File | null } }
    >({
      query({ id, inputs }) {
        const form = new FormData();
        Object.entries(inputs).forEach(([key, value]) => {
          if (value) {
            if (
              (key === "firstName" || key === "lastName") &&
              typeof value === "string"
            ) {
              value = value.trim().replace(/\s+/g, " ");
            }
            form.append(key, value);
          }
        });
        return {
          url: `${API_ROUTE.admin.main}${API_ROUTE.admin.user.dynamic(id)}`,
          method: "PATCH",
          body: form,
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: "User", id: arg.id }],
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    deleteUser: build.mutation<void, IDParams["id"]>({
      query(id) {
        return {
          url: `${API_ROUTE.admin.main}${API_ROUTE.admin.user.dynamic(id)}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: "User", id: arg }],
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useLazyGetUserQuery,
  useUpdateUserMutation,
} = usersApi;

export default usersApi;
