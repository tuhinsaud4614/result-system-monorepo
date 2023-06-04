import { Prisma } from "@prisma/client";
import _ from "lodash";

import {
  ClassRepository,
  UserRepository,
} from "@result-system/backend/repositories";
import {
  HttpError,
  NotFoundError,
  generateImage,
  removeFile,
} from "@result-system/backend/utility";
import {
  Code,
  CreateClassInput,
  IDParams,
  LeanPicture,
  LeanUserWithAvatar,
  Offset,
  UpdateUserInput,
  generateCRUDFailedErrorMessage,
  generateExistErrorMessage,
} from "@result-system/shared/utility";

/**
 * This function retrieves users from a database with pagination and filtering based on their role.
 * @param {Offset}  - - `limit`: The maximum number of users to return per page.
 * @returns The `getUsersService` function returns a Promise that resolves to an object with two
 * properties: `data` and `total`. The `data` property is an array of user objects, and the `total`
 * property is the total number of users that match the given condition. If there is an error, the
 * function returns a `HttpError` object.
 */
export async function getUsersService({ limit, page }: Offset) {
  try {
    const condition: Prisma.UserWhereInput = { role: { not: "ADMIN" } };
    const count = await UserRepository.count({
      where: condition,
    });
    if (count === 0) {
      return { data: [], total: count };
    }

    const args: Prisma.UserFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: condition,
    };

    return await UserRepository.getUsersWithOffset(
      count,
      Number(page),
      Number(limit),
      args,
    );
  } catch (error) {
    return new HttpError({
      message: generateCRUDFailedErrorMessage("users"),
      originalMessage: (error as Error).message,
    });
  }
}

/**
 * This function fetches a user by their ID and returns an error if the user is not found or
 * if there is an error during the fetch process.
 * @param id - The `id` parameter is of type `IDParams["id"]`, which means it is a string representing
 * the ID of a user. This ID is used to fetch the user from the database using the `getUserById` method
 * of the `UserRepository`.
 * @returns either a user object or an error object. If the user is found, the function returns the
 * user object. If the user is not found, the function returns a NotFoundError object. If there is an
 * error during the execution of the function, the function returns an HttpError object.
 */
export async function getUserService(id: IDParams["id"]) {
  try {
    const user = await UserRepository.getUserById(id, {
      role: { in: ["STUDENT", "TEACHER"] },
    });

    if (!user) {
      return new NotFoundError("User");
    }
    return user;
  } catch (error) {
    return new HttpError({
      message: generateCRUDFailedErrorMessage("user", "fetch"),
      originalMessage: (error as Error).message,
    });
  }
}

/**
 * This function deletes a user from the database and removes their avatar if it exists.
 * @param id - The `id` parameter is of type `IDParams["id"]`, which means it is a string representing
 * the ID of a user to be deleted.
 * @returns either nothing or an instance of `NotFoundError` or `HttpError`.
 */
export async function deleteUserService(id: IDParams["id"]) {
  try {
    const { avatar } = await UserRepository.deleteById(id);

    if (avatar) {
      await removeFile(avatar.url);
    }

    return;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new NotFoundError(
        "User",
        _.get(error, "meta.cause") as string,
        (error as Error).message,
      );
    }
    return new HttpError({
      message: generateCRUDFailedErrorMessage("user", "delete"),
      originalMessage: (error as Error).message,
    });
  }
}

/**
 * This function updates a user's information and avatar, and removes the previous avatar if it exists.
 * @param id - The ID of the user to be updated.
 * @param inputs - The `inputs` parameter is an object of type `Omit<UpdateUserInput,
 * "confirmPassword">`, which contains the updated user information to be saved in the database. The
 * `confirmPassword` field is omitted from this object, as it is not needed for updating a user's
 * information.
 * @param [avatar] - The `avatar` parameter is an optional `Express.Multer.File` object, which
 * represents an uploaded image file. It is used to update the user's avatar image. If an avatar is
 * provided, the function generates a new image and updates the user's avatar field with the new image.
 * If
 * @returns either the updated user object or an error object.
 */
export async function updateUserService(
  id: IDParams["id"],
  inputs: Omit<UpdateUserInput, "confirmPassword">,
  avatar?: Express.Multer.File,
) {
  try {
    let newAvatar: LeanPicture | undefined;
    let user: LeanUserWithAvatar | null = null;

    // If an avatar already exists, we need to remove the previous avatar from the assets. Therefore, we require the path of the old avatar.
    if (avatar) {
      user = await UserRepository.getUserById(id);
      if (!user) {
        return new NotFoundError("User");
      }

      newAvatar = await generateImage(avatar);
    }

    const updatedUser = await UserRepository.updateUser(id, {
      ...inputs,
      avatar: newAvatar,
    });

    // This action will effectively delete the previous avatar from the assets.
    if (user && user.avatar) {
      await removeFile(user.avatar.url);
    }

    return updatedUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new NotFoundError("User", undefined, (error as Error).message);
    }
    return new HttpError({
      message: generateCRUDFailedErrorMessage("user", "update"),
      originalMessage: (error as Error).message,
    });
  }
}

/**
 * This function retrieves a list of classes with pagination and sorting options from a database using
 * Prisma ORM.
 * @param {Offset}  - - `limit`: The maximum number of items to return per page.
 * @returns The `getClassesService` function returns either an object with an empty array and a `total`
 * property set to 0 if there are no classes in the database, or it returns the result of calling the
 * `getClassesWithOffset` method of the `ClassRepository` with the provided arguments. The result of
 * this method call is a Promise that resolves to an object with a `data` property
 */
export async function getClassesService({ limit, page }: Offset) {
  try {
    const count = await ClassRepository.count();
    if (count === 0) {
      return { data: [], total: count };
    }

    const args: Prisma.ClassRoomFindManyArgs = {
      orderBy: { updatedAt: "desc" },
    };

    return await ClassRepository.getClassesWithOffset(
      count,
      Number(page),
      Number(limit),
      args,
    );
  } catch (error) {
    return new HttpError({
      message: generateCRUDFailedErrorMessage("classes"),
      originalMessage: (error as Error).message,
    });
  }
}

/**
 * This function creates a new class and returns its ID, handling errors related to duplicate entries.
 * @param {CreateClassInput} inputs - The `inputs` parameter is an object of type `CreateClassInput`,
 * which contains the data needed to create a new class. This object likely includes properties such as
 * the class name, description, start and end dates, and any other relevant information needed to
 * create a new class.
 * @returns either the ID of the newly created class or an instance of the HttpError class, depending
 * on whether the creation was successful or not. If there was an error, the HttpError instance will
 * contain information about the error, including an error code and message.
 */
export async function createClassService(inputs: CreateClassInput) {
  try {
    const newClass = await ClassRepository.create(inputs);
    return newClass.id;
  } catch (error) {
    let code: Code | undefined,
      message = generateCRUDFailedErrorMessage("class", "create");
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      message = generateExistErrorMessage("Class");
      code = 409;
    }
    return new HttpError({
      code,
      message,
      originalMessage: (error as Error).message,
    });
  }
}
