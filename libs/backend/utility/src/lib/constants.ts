import path from "path";

/* The signals of the server. */
export const SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

/**  Name of the rest api route. */
export const API_ROUTE = {
  v1: "/api/v1",
  auth: {
    main: "/auth",
    registerUser: "/register",
    loginUser: "/login",
    token: "/token",
  },
  assets: "assets",
} as const;

export const ASSETS_DESTINATION = path.join(__dirname, API_ROUTE.assets);
