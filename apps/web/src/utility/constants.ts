import { API_ROUTE } from "@result-system/shared/utility";

export const WEB_KEYS = {
  persist: "PERSIST",
} as const;

export const WEB_PATHS = {
  dashboard: "/",
  login: API_ROUTE.auth.main,
  admin: {
    main: "/admin",
    users: "/admin/users",
    classes: "/admin/calsses",
  },
} as const;
