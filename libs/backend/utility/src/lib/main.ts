import { UserRole } from "@prisma/client";

import type { SuccessResponse } from "@result-system/shared/utility";

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
export function responseAsObj<T>(
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

/**
 * The function returns the current semester based on the current date.
 * @returns a string that represents the current semester in the format of "YYYY-S", where YYYY is the
 * current year and S is the semester number (1 for Spring, 2 for Summer, 3 for Fall).
 */
function getSemester() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${Math.ceil(month / 4) % 12}`;
}

/**
 * The function generates a username based on the user's role and count.
 * @param {UserRole} role - UserRole is a custom type that represents the role of a user. It can have
 * two possible values: "STUDENT" or "TEACHER".
 * @param {number} count - The count parameter is a number that represents the number of users with the
 * given role that have already been created. It is used to generate a unique username for each user by
 * appending it to a prefix based on their role and, in the case of students, the current semester.
 * @returns The function `generateUserName` returns a string that consists of either the current
 * semester and a count number (if the `role` parameter is "STUDENT"), or the first letter of the
 * `role` parameter and a count number (for any other `role` value). The count number is always padded
 * with zeros to ensure a minimum length of 5 digits.
 */
export function generateUserName(role: UserRole, count: number) {
  if (role === "STUDENT") {
    return `${getSemester()}-${1000 + count}`;
  }
  return `${role.charAt(0)}-${10000 + count}`;
}
