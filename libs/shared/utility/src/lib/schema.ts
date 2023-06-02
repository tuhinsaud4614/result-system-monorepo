import { has } from "lodash";
import sanitizeHtml from "sanitize-html";
import * as yup from "yup";

import { IMAGE_MIMES, PASSWORD_REGEX } from "./constants";
import {
  generateEitherErrorMessage,
  generateMatchedErrorMessage,
  generateNotImageErrorMessage,
  generateNotIntegerErrorMessage,
  generateNotPositiveNumberErrorMessage,
  generateRequiredErrorMessage,
  generateSanitizeErrorMessage,
} from "./response-message";
import type { NonAdminUserRole } from "./types";

/**
 * This function generates a Yup schema for validating an image file based on its mimetype.
 * @param {string} key - The `key` parameter is a string that represents the name of the field that the
 * schema is being generated for. It is used to generate error messages that are specific to that
 * field.
 */
export const generateImageFileSchema = (key: string) =>
  yup
    .mixed<Express.Multer.File>()
    .test(
      "fileFormat",
      generateNotImageErrorMessage(key),
      (value) => !!value && has(IMAGE_MIMES, value.mimetype),
    );

export const registerInputSchema = yup.object({
  firstName: yup
    .string()
    .required(generateRequiredErrorMessage("First name"))
    .test("sanitize", generateSanitizeErrorMessage("first name"), (value) => {
      return !!value && !!sanitizeHtml(value);
    }),
  lastName: yup
    .string()
    .required(generateRequiredErrorMessage("Last name"))
    .test("sanitize", generateSanitizeErrorMessage("last name"), (value) => {
      return !!value && !!sanitizeHtml(value);
    }),
  role: yup
    .string()
    .required(generateRequiredErrorMessage("Role"))
    .oneOf<NonAdminUserRole>(
      ["STUDENT", "TEACHER"],
      generateEitherErrorMessage<NonAdminUserRole>("Role", [
        "STUDENT",
        "TEACHER",
      ]),
    ),
  password: yup
    .string()
    .required(generateRequiredErrorMessage("Password"))
    .matches(
      PASSWORD_REGEX,
      "Password must be 8-64 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character like @$!%*?&",
    ),
  confirmPassword: yup
    .string()
    .required(generateRequiredErrorMessage("Confirm password"))
    .oneOf([yup.ref("password")], generateMatchedErrorMessage("Password")),
});

export const loginInputSchema = yup.object({
  username: yup
    .string()
    .required(generateRequiredErrorMessage("Username"))
    .test("sanitize", generateSanitizeErrorMessage("username"), (value) => {
      return !!value && !!sanitizeHtml(value);
    }),
  password: yup
    .string()
    .required(generateRequiredErrorMessage("Password"))
    .test("sanitize", generateSanitizeErrorMessage("password"), (value) => {
      return !!value && !!sanitizeHtml(value);
    }),
});

export const updateUserInputSchema = yup.object({
  firstName: yup
    .string()
    .test("sanitize", generateSanitizeErrorMessage("first name"), (value) => {
      if (!value) {
        return true;
      }
      return !!value && !!sanitizeHtml(value);
    }),
  lastName: yup
    .string()
    .test("sanitize", generateSanitizeErrorMessage("last name"), (value) => {
      if (!value) {
        return true;
      }
      return !!value && !!sanitizeHtml(value);
    }),
  password: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      PASSWORD_REGEX,
      "Password must be 8-64 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character like @$!%*?&",
    ),
  confirmPassword: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .when("password", ([password], schema) => {
      if (password) {
        return schema.required(
          generateRequiredErrorMessage("Confirm password"),
        );
      }
      return schema.notRequired();
    })
    .oneOf([yup.ref("password")], generateMatchedErrorMessage("Password")),
});

export const offsetQuerySchema = yup.object({
  limit: yup
    .number()
    .integer(generateNotIntegerErrorMessage("Limit"))
    .positive(generateNotPositiveNumberErrorMessage("Limit")),
  page: yup
    .number()
    .integer(generateNotIntegerErrorMessage("Page"))
    .positive(generateNotPositiveNumberErrorMessage("Page")),
});

export const idParamsSchema = (key: string) =>
  yup.object({
    id: yup.string().required(generateRequiredErrorMessage(`${key} ID`)),
  });
