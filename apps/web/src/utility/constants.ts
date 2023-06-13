import { API_ROUTE, IDParams } from "@result-system/shared/utility";

export const WEB_KEYS = {
  persist: "PERSIST",
} as const;

export const WEB_PATHS = {
  dashboard: "/",
  login: API_ROUTE.auth.main,
  admin: {
    main: "/admin",
    users: "/admin/users",
    addUser: "/admin/users/add",
    classes: "/admin/classes",
    classStudents: {
      static: "/admin/classes/:id/students",
      dynamic: (id: IDParams["id"]) => `/admin/classes/${id}/students`,
    },
    subjects: "/admin/subjects",
    editUser: {
      static: "/admin/users/:id/edit",
      dynamic: (id: IDParams["id"]) => `/admin/users/${id}/edit`,
    },
  },
} as const;
