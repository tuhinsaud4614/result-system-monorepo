import { Prisma } from "@prisma/client";

import {
  type UserCreateInput,
  prismaClient,
} from "@result-system/backend/utility";
import {
  IDParams,
  LeanUserWithAvatar,
  ResultWithOffset,
} from "@result-system/shared/utility";

export default class UserRepository {
  static #select = {
    id: true,
    avatar: { select: { url: true, width: true, height: true } },
    firstName: true,
    lastName: true,
    role: true,
    username: true,
    createdAt: true,
    updatedAt: true,
  } satisfies Prisma.UserSelect;
  /**
   * This function creates a user repository with an optional avatar input.
   * @param {UserCreateInput} inputs - The `inputs` parameter is an object of type `UserCreateInput`
   * which contains the data needed to create a new user in the database. It may include properties such
   * as `name`, `email`, `password`, and `avatar`. The `avatar` property is optional and may contain an
   * object
   * @returns The function `createUserRepository` is returning a Promise that resolves to the result of
   * creating a new user in the database using the `prismaClient` instance. The user data is taken from
   * the `inputs` parameter, and if an `avatar` is provided, it is also created and associated with the
   * user.
   */
  static create(inputs: UserCreateInput) {
    const { avatar, ...rest } = inputs;
    return prismaClient.user.create({
      data: {
        ...rest,
        avatar: avatar && { create: { ...avatar } },
      },
    });
  }

  /**
   * This function returns the count of users based on the provided condition using Prisma.
   * @param [condition] - The `condition` parameter is an optional argument of type
   * `Prisma.UserCountArgs` that can be passed to the `count` method. It is used to specify any
   * additional filtering or aggregation options for the count operation. For example, you can use it
   * to count only the users that meet certain
   * @returns The `count` method is returning the result of calling the `count` method on the
   * `prismaClient.user` object with the provided `condition` argument. The `count` method returns the
   * number of records that match the provided condition.
   */
  static count(condition?: Prisma.UserCountArgs) {
    return prismaClient.user.count(condition);
  }

  /**
   * This function retrieves a user with their avatar by their username using PrismaClient.
   * @param {string} username - The username parameter is a string that represents the unique
   * identifier of a user in the database. It is used to search for a specific user in the database.
   * @returns The function `getUserWithAvatarByUsername` is returning a Promise that resolves to a user
   * object with the specified `username` and includes the user's avatar object with the properties
   * `height`, `width`, and `url`. The user object and avatar object are retrieved from the database
   * using Prisma's `findUnique` method and the `include` option.
   */
  static getWithAvatarByUsername(username: string) {
    return prismaClient.user.findUnique({
      where: { username },
      include: {
        avatar: { select: { height: true, width: true, url: true } },
      },
    });
  }

  /**
   * This function returns a promise that finds and selects multiple users with their avatars based on
   * optional conditions.
   * @param [condition] - The `condition` parameter is an optional argument of type
   * `Prisma.UserFindManyArgs`. It is used to specify any additional conditions or filters that should
   * be applied when querying the database for users. These conditions can include things like sorting,
   * pagination, or filtering based on specific fields in the user table
   * @returns The `getUsers` function is returning a Promise that resolves to an array of
   * `LeanUserWithAvatar` objects. The function uses the Prisma client to query the database for
   * multiple user records based on the optional `condition` argument, and then selects specific fields
   * using the `select` property of the `this.#select` object.
   */
  static getUsers(
    condition?: Prisma.UserFindManyArgs,
  ): Promise<LeanUserWithAvatar[]> {
    return prismaClient.user.findMany({ ...condition, select: this.#select });
  }

  /**
   * This function retrieves a specified number of users with an optional offset and pagination, and
   * returns the results along with pagination information.
   * @param {number} count - The total number of users that match the given criteria.
   * @param {number} [page] - The page parameter is an optional parameter that specifies which page of
   * results to retrieve. It is used in conjunction with the limit parameter to determine the range of
   * results to return. If not provided, the default value is 1.
   * @param {number} [limit] - The maximum number of records to be returned in a single page.
   * @param [args] - args is an optional parameter of type Prisma.UserFindManyArgs. It is used to pass
   * additional arguments to the Prisma client's findMany method for querying the User table. These
   * arguments can include filters, sorting options, and other options supported by Prisma.
   * @returns The function `getUsersWithOffset` returns a Promise that resolves to an object with
   * properties `data`, `total`, and `pageInfo`. The `data` property contains an array of
   * `LeanUserWithAvatar` objects, the `total` property contains the total number of users, and the
   * `pageInfo` property contains information about the pagination, such as whether there is a next
   * page,
   */
  static async getUsersWithOffset(
    count: number,
    page?: number,
    limit?: number,
    args?: Prisma.UserFindManyArgs,
  ): Promise<ResultWithOffset<LeanUserWithAvatar>> {
    if (limit && page) {
      const result = await prismaClient.user.findMany({
        ...args,
        skip: (page - 1) * limit,
        take: limit,
        select: this.#select,
      });

      return {
        data: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        },
      };
    }

    const result = await this.getUsers({ ...args });
    return { data: result, total: count };
  }

  /**
   * This function deletes a user from the database based on their ID.
   * @param id - The `id` parameter is of type `IDParams["id"]`, which means it is a string
   * representing the unique identifier of a user in the database. This function uses the Prisma client
   * to delete a user from the database based on their `id`.
   * @returns The `deleteById` function is returning a Promise that will resolve to the result of
   * deleting a user from the database using the `prismaClient.user.delete` method. The `where` clause
   * specifies that the user to be deleted has the `id` passed as a parameter.
   */
  static deleteById(id: IDParams["id"]) {
    return prismaClient.user.delete({ where: { id } });
  }
}
