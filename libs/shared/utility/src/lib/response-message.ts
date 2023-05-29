import { UserRole } from "@prisma/client";

import { IMAGE_MIMES } from "./constants";
import { isVowel } from "./type-guard";

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
    } ${orRole}`;
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
  return `${key} should be either ${result}`;
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
  return `The ${field} field must contain ${verb} ${length} items`;
}

/**
 * Generates an error message indicating that a key must be a valid.
 *
 * @param key The name of a valid key.
 * @returns The error message.
 */
export function generateInvalidErrorMessage(key: string): string {
  return `Please enter a valid ${key}`;
}

/**
 * Generates an error message indicating that two values must match.
 *
 * @param key The name of the key that must match.
 * @returns The error message.
 */
export function generateMatchedErrorMessage(key: string): string {
  return `${key} must match`;
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
  return `${field} size should be less than ${value}`;
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
 * This function generates an error message indicating that a given key already exists.
 * @param {string} key - The key parameter is a string that represents the identifier or name of a
 * resource or object that already exists. The function generates an error message indicating that the
 * resource or object with the given key already exists.
 * @returns A string message that includes the key parameter and the phrase "already exists."
 */
export function generateExistErrorMessage(key: string): string {
  return `${key} already exists`;
}

/** Generates an error message indicating that a key does not exist.
 * @param key The name of the key.
 * @returns The error message.
 */
export function generateNotExistErrorMessage(key: string): string {
  return `${key} does not exist.`;
}

/**
 * This function generates a failed error message for CRUD operations.
 * @param {string} key - The key is a string parameter that represents the name or identifier of the
 * resource that the CRUD operation is being performed on. For example, if the CRUD operation is being
 * performed on a user resource, the key could be "user".
 * @param {"create" | "delete" | "fetch" | "update" | "upload"} [mode=fetch] - The `mode` parameter is
 * a string literal type that specifies the CRUD operation that failed. It can be one of the following
 * values: "create", "delete", "fetch", "update", or "upload". The default value is "fetch".
 * @returns A string message is being returned that says "Failed to [mode] the [key]". The mode
 * parameter is optional and defaults to "fetch". The key parameter is a string that represents the
 * resource being acted upon (e.g. "user", "product", etc.).
 */
export function generateCRUDFailedErrorMessage(
  key: string,
  mode: "create" | "delete" | "fetch" | "update" | "upload" = "fetch",
): string {
  return `Failed to ${mode} the ${key}`;
}

/**
 * This function generates an error message for unauthorized access with a customizable
 * subject.
 * @param [subjectWIthAuxiliary=You are] - A string that represents the subject of the error message,
 * with an optional auxiliary verb. The default value is "You are".
 * @returns A string message that says "You are not authorized" by default, but the subject can be
 * customized by passing a string as an argument to the function.
 */
export function generateUnAuthorizedErrorMessage(
  subjectWIthAuxiliary = "You are",
): string {
  return `${subjectWIthAuxiliary} not authorized`;
}

/**
 * This function generates an error message for invalid credentials with a specific action.
 * @param {string} action - The `action` parameter is a string that represents the action for which the
 * credentials are invalid. It is used to generate an error message indicating that the credentials
 * provided for that action are invalid.
 * @returns A string message is being returned. The message is "Invalid credentials for {action}" where
 * {action} is the parameter passed to the function.
 */
export function generateInvalidCredentialErrorMessage(action: string) {
  return `Invalid credentials for ${action}`;
}

/**
 * This function generates an error message for a failed action.
 * @param {string} action - The `action` parameter is a string that represents the action that failed.
 * It is used to generate an error message indicating that the action failed.
 * @returns A string message that says "Failed to [action]". The specific action being passed as a
 * parameter will be inserted into the message.
 */
export function generateActionFailedErrorMessage(action: string) {
  return `Failed to ${action}`;
}

/**
 * Generates an error message indicating that a value should be a number.
 *
 * @param field The name of the field.
 * @returns The error message.
 */
export function generateNotNumberErrorMessage(field: string): string {
  return `${field} must be a number.`;
}

/**
 * This function generates an error message stating that a given field should be an integer.
 * @param {string} field - The name of the field that is expected to be an integer.
 * @returns a string message that says the input field should be an integer.
 */
export function generateNotIntegerErrorMessage(field: string): string {
  return `${field} must be an integer.`;
}

/**
 * This function generates an error message for a field that must be a positive number.
 * @param {string} field - The name of the field that the error message is referring to.
 * @returns A string message that states that the given field must be a positive number. The message is
 * generated by concatenating the name of the field with the rest of the message.
 */
export function generateNotPositiveNumberErrorMessage(field: string): string {
  return `${field} must be a positive number.`;
}
