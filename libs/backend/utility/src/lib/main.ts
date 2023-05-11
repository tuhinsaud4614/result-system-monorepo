import type { UserRole } from "@prisma/client";
import { unlink } from "fs/promises";
import { type JwtPayload } from "jsonwebtoken";
import _ from "lodash";
import path from "path";
import sharp from "sharp";

import {
  type AuthorizedUser,
  type IMAGE_MIME,
  IMAGE_MIMES,
  type LeanPicture,
  type SuccessResponse,
  isObjectWithKeys,
} from "@result-system/shared/utility";

import { API_ROUTE } from "./constants";
import { AuthenticationError } from "./model";

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

/**
 * This function uses the sharp library to retrieve the width and height of an image file. This will work for after save in diskStorage.
 * @param {string} imgPath - imgPath is a string parameter that represents the path of the image file after save in the `disk storage`
 * for which we want to get the size.
 * @returns The function `getImageSize` returns an object containing the width and height of an image
 * file specified by the `imgPath` parameter. The values are obtained using the `sharp` library's
 * `metadata` method, which returns a Promise that resolves to an object containing metadata about the
 * image, including its dimensions. The function uses `await` to wait for the Promise to resolve before
 * returning the object with
 */
export async function getImageSize(imgPath: string) {
  const { width, height } = await sharp(imgPath).metadata();
  return { width, height };
}

/**
 * This TypeScript function generates a unique image name with a fieldname, timestamp, and random
 * number, and returns the name with its original file extension.
 * @param {string} fieldname - The name of the field in the form that contains the file being uploaded.
 * For example, if the file input field in the form has the name "profile-picture", then
 * "profile-picture" would be the fieldname parameter in this function.
 * @param {string} originalname - The `originalname` parameter is a string that represents the original
 * name of the file being uploaded. It is used to generate a new name for the file that includes a
 * timestamp and a random number to ensure uniqueness.
 * @returns An object with two properties: "name" and "withExt". "name" is a string that includes the
 * fieldname, the current timestamp, and a random number. "withExt" is the same string as "name", but
 * with the file extension of the original file name appended to it.
 */
export function generateImageName(fieldname: string, originalname: string) {
  const now = Date.now();
  const digit = Math.pow(10, Math.floor(Math.log10(now)));

  const name = `${fieldname}-${now}-${Math.floor(Math.random() * digit)}`;

  return { name, withExt: name + path.extname(originalname) };
}

/**
 * This function generates an image with a specified location and returns its URL, width, and height. This will work for after save in diskStorage.
 * @param file - The file parameter is an object that represents the uploaded image file. It is of type
 * Express.Multer.File, which is a type definition for files uploaded using the Multer middleware in an
 * Express.js application.
 * @param {string} location - The location where the generated image will be saved. It is a string that
 * represents the path to the directory where the image will be saved.
 * @returns a Promise that resolves to an object with the properties "url", "width", and "height". The
 * object is wrapped in a Pretty type, which likely adds some formatting or styling to the output.
 */
export async function generateImage(
  file: Express.Multer.File,
): Promise<LeanPicture> {
  const { height, width } = await getImageSize(file.path);
  const url = path.join(API_ROUTE.assets, file.filename);

  if (width && height) {
    return { width, height, url };
  }

  await unlink(file.path);

  const format = IMAGE_MIMES[file.mimetype as IMAGE_MIME];
  const newImg = await sharp(file.path)
    .resize(width || height || 200, height || width || 200)
    .toFormat(format)
    .toFile(file.path);

  return { height: newImg.height, width: newImg.width, url };
}

/**
 * This function generates a Redis key by concatenating a prefix ("REFRESH_TOKEN") and a suffix.
 * @param prefix - The prefix parameter is a string that is used as a prefix for the generated Redis
 * key. In this specific case, the prefix is "REFRESH_TOKEN".
 * @param {string} suffix - The `suffix` parameter is a string that will be appended to the `prefix`
 * parameter to generate a Redis key.
 */
export const generateRedisKey = (prefix: "REFRESH_TOKEN", suffix: string) =>
  `${prefix}@${suffix}`;

/**
 * This function deserializes a user object with an avatar from a decoded JWT payload.
 * @param {string | JwtPayload} decoded - The `decoded` parameter is either a string or a `JwtPayload`
 * object. It is used as input to the `deserializeUserWithAvatar` function.
 * @returns The function `deserializeUserWithAvatar` returns an object of type `AuthorizedUser` which
 * contains the properties `id`, `firstName`, `lastName`, `username`, `role`, and `avatar`. The
 * function first checks if the `decoded` parameter is an object with all the required keys using the
 * `isObjectWithKeys` function. If it is, the function returns a new object with only
 */
export function deserializeUserWithAvatar(
  decoded: string | JwtPayload,
): AuthorizedUser {
  const keys = [
    "id",
    "firstName",
    "lastName",
    "username",
    "role",
    "avatar",
  ] as const;

  if (isObjectWithKeys(decoded, keys)) {
    return _.pick(decoded, keys);
  }

  throw new AuthenticationError();
}
