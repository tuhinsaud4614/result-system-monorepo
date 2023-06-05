import { ClassRoom } from "@prisma/client";
import _ from "lodash";

import {
  API_ROUTE,
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
  }),
});

export const { useGetClassesQuery } = classesApi;

export default classesApi;
