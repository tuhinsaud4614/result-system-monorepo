/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma } from "@prisma/client";

import { UserRepository } from "@result-system/backend/repositories";
import { HttpError } from "@result-system/backend/utility";
import {
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
