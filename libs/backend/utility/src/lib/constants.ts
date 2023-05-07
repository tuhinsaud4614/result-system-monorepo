/* The signals of the server. */
export const SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

/**  Name of the rest api route. */
export const API_ROUTE = {
  v1: "/api/v1",
  auth: {
    main: "/auth",
    registerUser: "/register",
  },
} as const;
