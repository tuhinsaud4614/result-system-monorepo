import {
  type UserCreateInput,
  prismaClient,
} from "@result-system/backend/utility";

export default class UserRepository {
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
   * Returns the number of users in the database.
   * @returns {Promise<number>} A promise that resolves to the number of users.
   */
  static count() {
    return prismaClient.user.count();
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
}
