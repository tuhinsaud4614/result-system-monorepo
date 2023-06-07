import { ClassRoom } from "@prisma/client";
import _ from "lodash";

import {
  API_ROUTE,
  CreateClassInput,
  IDParams,
  Offset,
  ResultWithOffset,
  SuccessResponse,
} from "@result-system/shared/utility";

import { api } from "./api";

const classesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getClasses: build.query<
      SuccessResponse<ResultWithOffset<ClassRoom>>,
      Offset
    >({
      query: (offsetQuery) => {
        const { limit, page } = offsetQuery;
        const q = limit && page ? `?page=${page}&limit=${limit}` : "";
        return {
          url: `${API_ROUTE.admin.main}${API_ROUTE.admin.classes}${q}`,
          method: "GET",
        };
      },
      providesTags: (classes, _error, _arg) => {
        if (classes) {
          return [
            { type: "Class", id: "LIST" },
            ...classes.data.data.map(({ id }) => ({
              type: "Class" as const,
              id,
            })),
          ];
        } else return [{ type: "Class", id: "LIST" }];
      },
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    createClass: build.mutation<string, CreateClassInput>({
      query(body) {
        body.name = body.name.trim().replace(/\s+/g, " ");
        return {
          url: `${API_ROUTE.admin.main}${API_ROUTE.admin.classes}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Class", id: "LIST" }],
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
    deleteClass: build.mutation<void, IDParams["id"]>({
      query(id) {
        return {
          url: `${API_ROUTE.admin.main}${API_ROUTE.admin.class.dynamic(id)}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: "Class", id: arg }],
      transformErrorResponse(baseQueryReturnValue, _meta, _args) {
        return _.get(baseQueryReturnValue, "data") || baseQueryReturnValue;
      },
    }),
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useDeleteClassMutation,
} = classesApi;

export default classesApi;
