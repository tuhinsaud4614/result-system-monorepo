import { Prisma } from "@prisma/client";
import _ from "lodash";

import { UserRepository } from "@result-system/backend/repositories";
import { HttpError, NotFoundError } from "@result-system/backend/utility";
import {
  IDParams,
  OffsetQuery,
  generateCRUDFailedErrorMessage,
} from "@result-system/shared/utility";

/**
 * This function retrieves users from a database with pagination and filtering based on their role.
 * @param {OffsetQuery}  - - `limit`: The maximum number of users to return per page.
 * @returns The `getUsersService` function returns a Promise that resolves to an object with two
 * properties: `data` and `total`. The `data` property is an array of user objects, and the `total`
 * property is the total number of users that match the given condition. If there is an error, the
 * function returns a `HttpError` object.
 */
export async function getUsersService({ limit, page }: OffsetQuery) {
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
 * This TypeScript function deletes a user by their ID and returns an error message if the deletion
 * fails.
 * @param id - The `id` parameter is of type `IDParams["id"]`, which means it is a string representing
 * the unique identifier of a user that needs to be deleted.
 * @returns If the deletion is successful, nothing is returned explicitly (i.e., `undefined` is
 * returned). If there is an error during the deletion, a `HttpError` object is returned with a message
 * indicating that the deletion failed and the original error message.
 */
export async function deleteUserService(id: IDParams["id"]) {
  try {
    await UserRepository.deleteById(id);
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
