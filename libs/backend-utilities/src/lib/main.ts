import type { SuccessResponse } from "@result-system/shared-types";

/**
 * It returns an object with a success property set to true, a message property set to the message
 * argument, a data property set to the data argument, a detail property set to the detail argument,
 * and a timestamp property set to the current date and time
 * @param {string} message - The message to be displayed to the user.
 * @param {T} data - The data you want to return.
 * @param {string | null} [detail=null] - This is an optional parameter that can be used to provide
 * more information about the response.
 * @returns An object with the following properties:
 *   data: T
 *   detail: string | null
 *   message: string
 *   success: boolean
 *   timestamp: string
 */
export default function responseAsObj<T>(
  data: T,
  message?: string,
  detail?: string,
): SuccessResponse<T> {
  return {
    data,
    detail,
    message,
    success: true,
    timestamp: new Date().toISOString(),
  } as const;
}
