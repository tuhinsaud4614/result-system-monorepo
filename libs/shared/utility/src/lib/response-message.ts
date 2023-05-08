import { IMAGE_MIMES } from "./constants";
import { isVowel } from "./type-guard";
import { UserRole } from "./types";

/**
 * Generates an error message indicating that a key is required.
 *
 * @param key The name of the key.
 * @returns The error message.
 */
export function generateRequiredErrorMessage(key: string): string {
  return `${key} is required`;
}

/**
 * Generates an error message indicating that a user must have a certain role.
 *
 * @param role The required role.
 * @param orRole An optional alternate role.
 * @returns The error message.
 */
export function generateRoleErrorMessage(
  role: UserRole,
  orRole?: UserRole,
): string {
  let message = `You must be ${isVowel(role) ? "an" : "a"} ${role}.`;

  if (orRole) {
    message += ` Alternatively, you must be ${
      isVowel(orRole) ? "an" : "a"
    } ${orRole}.`;
  }

  return message;
}

/**
 * This function generates an error message indicating that a certain key should be one of a
 * list of specified values.
 * @param {string} key - a string representing the name of the field or parameter that is being
 * validated.
 * @param {string[]} values - values is an array of strings that represent the possible values that a
 * certain key can have.
 * @returns a string message that states that a certain key should be either one of the values provided
 * in the `values` array. The message is generated using string interpolation and the `join()` method
 * to concatenate the values in the array with the string "or".
 */
export function generateEitherErrorMessage<TValue extends string>(
  key: string,
  values: TValue[],
): string {
  const result = values.map((value) => `"${value}"`).join(" or ");
  return `${key} should be either ${result}.`;
}

/**
 * This function generates an error message for an array field based on whether it should
 * have a minimum or maximum length.
 * @param {"min" | "max"} mode - A string that can only be either "min" or "max", indicating whether
 * the error message is for a minimum or maximum length requirement.
 * @param {string} field - The name of the field that the error message is referring to. For example,
 * if the field is an array of user names, the error message might say "The user names field must
 * contain at least 3 items."
 * @param {number} length - The length parameter is a number that represents the minimum or maximum
 * number of items that a field must contain, depending on the mode parameter.
 * @returns A string message indicating the minimum or maximum number of items required for a given
 * field in an array. The message is generated based on the input parameters `mode`, `field`, and
 * `length`.
 */
export function generateArrayLengthErrorMessage(
  mode: "min" | "max",
  field: string,
  length: number,
): string {
  const verb = mode === "min" ? "at least" : "at most";
  return `The ${field} field must contain ${verb} ${length} items.`;
}

/**
 * Generates an error message indicating that a key must be a valid.
 *
 * @param key The name of a valid key.
 * @returns The error message.
 */
export function generateInvalidErrorMessage(key: string): string {
  return `Please enter a valid ${key}.`;
}

/**
 * Generates an error message indicating that two values must match.
 *
 * @param key The name of the key that must match.
 * @returns The error message.
 */
export function generateMatchedErrorMessage(key: string): string {
  return `${key} must match.`;
}

/**
 * This function generates an error message indicating that a certain key should be an image based on a
 * list of image MIME types.
 * @param {string} key - The key is a string parameter that represents the name or identifier of the
 * image file or object that is being checked. It is used in the error message to identify which image
 * failed the validation.
 * @returns a string message that includes the provided key and a list of image MIME types. The message
 * informs the user that the provided key should be an image with one of the specified MIME types.
 */
export function generateNotImageErrorMessage(key: string): string {
  const values = Object.values(IMAGE_MIMES).join(", ");
  return `${key} should be image (${values})`;
}

/**
 * This function generates an error message for when a file size is too large.
 * @param {string} field - The name of the field that has a size limit.
 * @param {string} value - The value parameter in the function represents the maximum allowed size for
 * a file. The function generates an error message if a file exceeds this maximum size.
 * @returns a string message that states that the size of a certain field should be less than a certain
 * value. The message is generated using the parameters `field` and `value` passed to the function.
 */
export function generateTooLargeFileErrorMessage(
  field: string,
  value: string,
): string {
  return `${field} size should be less than ${value}.`;
}

/**
 * This function generates an error message for a potentially malicious value entered in a
 * specific field.
 * @param {string} field - The field parameter is a string that represents the name or label of a field
 * in a form or data input. The function generates an error message that indicates that a malicious
 * value has been entered in that field.
 * @returns A string message is being returned. The message indicates that a malicious value has been
 * entered in a specific field, which is passed as an argument to the function.
 */
export function generateSanitizeErrorMessage(field: string): string {
  return `Malicious value entered in the ${field} field`;
}

/**
 * This function generates a message indicating that a file upload has failed for a specific field.
 * @param {string} field - The parameter "field" is a string that represents the name or description of
 * the file that failed to upload.
 * @returns a string message that says "Failed to upload the [field]", where [field] is the value of
 * the parameter passed to the function.
 */
export function generateFileUploadFailedMessage(field: string): string {
  return `Failed to upload the ${field}`;
}
