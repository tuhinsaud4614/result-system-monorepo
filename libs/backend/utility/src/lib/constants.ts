import path from "path";

import { API_ROUTE } from "@result-system/shared/utility";

/* The signals of the server. */
export const SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

/**  Name of the rest api route. */

export const ASSETS_DESTINATION = path.join(__dirname, API_ROUTE.assets);
