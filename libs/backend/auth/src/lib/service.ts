import { Prisma } from "@prisma/client";
import { hash as argonHash } from "argon2";
import { unlink } from "fs";
import path from "path";

import {
  ASSETS_DESTINATION,
  HttpError,
  UserRegistrationBody,
  UserRepository,
  generateImage,
  generateUserName,
} from "@result-system/backend/utility";
import {
  type Code,
  generateCRUDFailedErrorMessage,
  generateExistErrorMessage,
} from "@result-system/shared/utility";

import { createUser } from "./repository";

/**
 * This is an async function that handles user registration by creating a new user with hashed
 * password, generated username, and optional avatar image, and returns the user ID or an HTTP error if
 * the operation fails.
 * @param {UserRegistrationBody} data - The `data` parameter is an object containing the user
 * registration data, including the user's password, role, first name, and last name.
 * @param {Express.Multer.File | undefined} image - The `image` parameter is an optional
 * `Express.Multer.File` object that represents an uploaded image file. It is used to generate a new
 * image and assign it to the `avatar` field of the newly created user. If no image is uploaded, the
 * `avatar` field will be set
 * @returns either the ID of the newly created user or an instance of HttpError with a status code and
 * message.
 */
export async function userRegistrationService(
  data: UserRegistrationBody,
  image: Express.Multer.File | undefined,
) {
  try {
    const count = await UserRepository.countUser();

    const { password, role, firstName, lastName } = data;

    const hashPassword = await argonHash(password);

    const newImg = image && (await generateImage(image));

    const username = generateUserName(role, count);

    const user = await createUser({
      role,
      username,
      firstName,
      lastName,
      password: hashPassword,
      avatar: newImg,
    });

    return user.id;
  } catch (error) {
    if (image) {
      unlink(path.join(ASSETS_DESTINATION, image.path), () => undefined);
    }
    let code: Code = 500,
      message = generateCRUDFailedErrorMessage("user", "create");
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      message = generateExistErrorMessage("User");
      code = 400;
    }
    return new HttpError({ code, message });
  }
}
