import { Prisma } from "@prisma/client";
import { hash as argonHash, verify as argonVerify } from "argon2";
import { unlink } from "fs";
import path from "path";

import {
  ASSETS_DESTINATION,
  HttpError,
  UserRepository,
  generateImage,
  generateUserName,
  logger,
} from "@result-system/backend/utility";
import {
  type Code,
  LoginInput,
  type RegisterInput,
  generateActionFailedErrorMessage,
  generateCRUDFailedErrorMessage,
  generateExistErrorMessage,
  generateInvalidCredentialErrorMessage,
  generateNotExistErrorMessage,
} from "@result-system/shared/utility";

import { generateJwtTokens } from "./helper";
import {
  createUserRepository,
  getUserByUsernameWithAvatarRepository,
} from "./repository";

/**
 * This is a function that handles user registration by creating a new user with hashed
 * password, generated username, and optional avatar image, and returns the user ID or an HTTP error if
 * the operation fails.
 * @param {RegisterInput} data - The `data` parameter is an object of type `RegisterInput` which
 * contains the user's registration information such as `password`, `role`, `firstName`, and
 * `lastName`.
 * @param {Express.Multer.File | undefined} image - The `image` parameter is an optional
 * `Express.Multer.File` object that represents an image file uploaded by the user during registration.
 * It is used to generate a new image file and store it in the server's file system. If no image is
 * uploaded, this parameter will be `undefined`.
 * @returns either the ID of the newly created user or an instance of HttpError with a status code and
 * message.
 */
export async function userRegistrationService(
  data: RegisterInput,
  image: Express.Multer.File | undefined,
) {
  try {
    const count = await UserRepository.countUser();

    const { password, role, firstName, lastName } = data;

    const hashPassword = await argonHash(password);

    const newImg = image && (await generateImage(image));

    const username = generateUserName(role, count);

    const user = await createUserRepository({
      role,
      username,
      firstName,
      lastName,
      password: hashPassword,
      avatar: newImg,
    });

    return user.id;
  } catch (error) {
    logger.error((error as Error).message);
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
      code = 409;
    }
    return new HttpError({ code, message });
  }
}

/**
 * This is a function that handles user login by verifying their credentials and generating
 * JWT tokens.
 * @param {LoginInput} data - The `data` parameter is an object of type `LoginInput` which contains the
 * `username` and `password` properties.
 * @returns either an HttpError object or a Promise that resolves to a generated JWT token. If an error
 * occurs during the execution of the function, it returns an HttpError object with a message
 * indicating that the login action failed.
 */
export async function loginService(data: LoginInput) {
  try {
    const { username, password } = data;

    const user = await getUserByUsernameWithAvatarRepository(username);

    if (!user) {
      return new HttpError({
        message: generateNotExistErrorMessage("User"),
        code: 403,
      });
    }

    const isValidPassword = await argonVerify(user.password, password);

    if (!isValidPassword) {
      return new HttpError({
        code: 409,
        message: generateInvalidCredentialErrorMessage("login"),
      });
    }

    return await generateJwtTokens(user);
  } catch (error) {
    logger.error((error as Error).message);
    return new HttpError({
      message: generateActionFailedErrorMessage("login"),
    });
  }
}
