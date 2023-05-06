import type { Code, ErrorResponse } from "@result-system/shared/utility";
import { CODE } from "@result-system/shared/utility";

/* It's a class that extends the Error class and has a code property */
export default class HttpError extends Error {
  code: Code;
  #paths: ErrorResponse["paths"];
  #detail?: string;

  constructor({
    message,
    code,
    detail,
    paths,
  }: {
    message: string;
    code: Code;
    paths?: ErrorResponse["paths"];
    detail?: string;
  }) {
    super(message);
    this.code = code;
    this.#paths = paths;
    this.#detail = detail;
    // this is for instanceof behave properly
    Object.setPrototypeOf(this, HttpError.prototype);
  }

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
