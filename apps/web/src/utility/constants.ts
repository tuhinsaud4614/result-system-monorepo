import { API_ROUTE, LeanUserWithAvatar } from "@result-system/shared/utility";

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
    subjects: "/admin/subjects",
    edit: {
      static: "/admin/users/:id/edit",
      dynamic: (id: LeanUserWithAvatar["id"]) => `/admin/users/${id}/edit`,
    },
  },
} as const;
