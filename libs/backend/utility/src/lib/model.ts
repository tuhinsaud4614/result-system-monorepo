import {
  CODE,
  Code,
  ErrorResponse,
  generateForbiddenErrorMessage,
  generateNotExistErrorMessage,
  generateUnAuthorizedErrorMessage,
} from "@result-system/shared/utility";

interface Params {
  message: string;
  /**
   * `200`: "OK"
   *
   * `201`: "CREATED"
   *
   * `204`: "No_CONTENT"
   *
   * `301`: "MOVED_PERMANENTLY"
   *
   * `400`: "BAD_REQUEST"
   *
   * `401`: "UNAUTHORIZED"
   *
   * `402`: "PAYMENT_REQUIRED"
   *
   * `403`: "FORBIDDEN"
   *
   * `404`: "NOT_FOUND"
   *
   * `409`: "CONFLICT"
   *
   * `415`: "UNSUPPORTED_MEDIA_TYPE"
   *
   * `422`: "BAD_USER_INPUT"
   *
   * `429`: "TOO_MANY_REQUESTS"
   *
   * `431`: "REQUEST_HEADER_FIELDS_TOO_LARGE"
   *
   * `500`: "INTERNAL_SERVER_ERROR"
   */
  code?: Code;
  paths?: ErrorResponse["paths"];
  detail?: string;
  originalMessage?: string;
}

/* It's a class that extends the Error class and has a code property */
export class HttpError extends Error {
  code: Code;
  #paths: ErrorResponse["paths"];
  #detail?: string;
  originalMessage?: string;

  constructor({ message, code, detail, paths, originalMessage }: Params) {
    super(message);
    this.code = code || 500;
    this.#paths = paths;
    this.#detail = detail;
    this.originalMessage = originalMessage;
  }

  /**
   * The function returns an ErrorResponse object with specific properties.
   * @returns A JavaScript object of type `ErrorResponse` is being returned. The object has the
   * following properties:
   * - `success`: a boolean value set to `false`
   * - `message`: a string value set to the value of `this.message`
   * - `code`: a string value corresponding to the value of `CODE[this.code]`
   * - `timeStamp`: a string value representing the current date and time in
   */
  toObj(): ErrorResponse {
    return {
      success: false,
      message: this.message,
      code: CODE[this.code],
      timeStamp: new Date().toISOString(),
      paths: this.#paths,
      detail: this.#detail,
    };
  }
}

/* The AuthenticationError class extends the HttpError class and represents an error that occurs when
authentication fails with a default message of "Unauthorized". */
export class AuthenticationError extends HttpError {
  constructor(
    message = generateUnAuthorizedErrorMessage(),
    originalMessage?: string,
  ) {
    super({ code: 401, message, originalMessage });
  }
}

export class ForbiddenError extends HttpError {
  constructor(
    message = generateForbiddenErrorMessage(),
    originalMessage?: string,
  ) {
    super({ code: 403, message, originalMessage });
  }
}

export class NotFoundError extends HttpError {
  constructor(
    key: string,
    message = generateNotExistErrorMessage(key),
    originalMessage?: string,
  ) {
    super({ code: 404, message, originalMessage });
  }
}
