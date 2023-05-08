import type { Code, ErrorResponse } from "@result-system/shared/utility";
import { CODE } from "@result-system/shared/utility";

/* It's a class that extends the Error class and has a code property */
export class HttpError extends Error {
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
