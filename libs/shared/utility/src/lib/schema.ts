import { has } from "lodash";
import * as yup from "yup";

import { IMAGE_MIMES, PASSWORD_REGEX } from "./constants";
import { maxFileSize } from "./main";
import {
  generateEitherErrorMessage,
  generateMatchedErrorMessage,
  generateNotImageErrorMessage,
  generateRequiredErrorMessage,
  generateTooLargeFileErrorMessage,
} from "./response-message";
import type { NonAdminUserRole } from "./types";

/**
 * This function generates a Yup schema for validating image files based on their format and size.
 * @param {string} key - The key is a string that represents the name or identifier of the image file
 * input field. It is used to generate error messages and to identify the field in the form data.
 * @param [maxSize=5] - The `maxSize` parameter is a number that represents the maximum file size in
 * megabytes (MB) that is allowed for the image file. It is used to validate the size of the image file
 * in the `fileSize` test. If the size of the image file exceeds the `maxSize
 */
export const generateImageFileSchema = (key: string, maxSize = 5) =>
  yup
    .mixed<File>()
    // .required(generateRequiredErrorMessage(key))
    .test(
      "fileFormat",
      generateNotImageErrorMessage(key),
      (value) => !!value && has(IMAGE_MIMES, value.type),
    )
    .test(
      "fileSize",
      generateTooLargeFileErrorMessage(key, `${maxFileSize(maxSize)} Mb`),
      (value) => !!value && value.size <= maxFileSize(maxSize),
    );

export const registerInputSchema = yup.object({
  firstName: yup.string().required(generateRequiredErrorMessage("First name")),
  lastName: yup.string().required(generateRequiredErrorMessage("Last name")),
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
  avatar: generateImageFileSchema("Avatar"),
  password: yup
    .string()
    .required(generateRequiredErrorMessage("Password"))
    .matches(
      PASSWORD_REGEX,
      "Password must be 8-64 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    ),
  confirmPassword: yup
    .string()
    .required(generateRequiredErrorMessage("Confirm password"))
    .oneOf([yup.ref("password")], generateMatchedErrorMessage("Password")),
});
