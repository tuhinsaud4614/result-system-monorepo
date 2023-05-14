/** The Response Code corresponding to the status code. */
export const CODE = {
  200: "OK", // code: 200
  201: "CREATED", // code: 201
  204: "No_CONTENT", // code: 201
  301: "MOVED_PERMANENTLY", // code: 301
  400: "BAD_REQUEST", // code: 400
  401: "UNAUTHORIZED", // code: 401
  402: "PAYMENT_REQUIRED", // code: 402
  403: "FORBIDDEN", // code: 403
  404: "NOT_FOUND", // code: 404
  409: "CONFLICT", // code: 409
  415: "UNSUPPORTED_MEDIA_TYPE", // code: 415
  422: "BAD_USER_INPUT", // code: 422
  429: "TOO_MANY_REQUESTS", // code: 429
  431: "REQUEST_HEADER_FIELDS_TOO_LARGE", // code: 431
  500: "INTERNAL_SERVER_ERROR",
} as const;

export const IMAGE_MIMES = {
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

// Regex
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

export const API_ROUTE = {
  v1: "/api/v1",
  auth: {
    main: "/auth",
    registerUser: "/register",
    loginUser: "/login",
    token: "/token",
    logoutUser: "/logout",
  },
  assets: "assets",
} as const;
