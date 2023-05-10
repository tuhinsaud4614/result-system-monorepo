import {
  type UserCreateInput,
  prismaClient,
} from "@result-system/backend/utility";

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
export function createUserRepository(inputs: UserCreateInput) {
  const { avatar, ...rest } = inputs;
  return prismaClient.user.create({
    data: {
      ...rest,
      avatar: avatar && { create: { ...avatar } },
    },
  });
}

/**
 * This function retrieves a user by their username and includes their avatar information.
 * @param {string} username - The `username` parameter is a string that represents the unique
 * identifier of a user in the database. It is used as a filter to retrieve a specific user from the
 * `user` table in the database.
 * @returns a Promise that resolves to a user object with the specified username and includes the
 * avatar object with its height, width, and URL properties. The user object and its avatar object are
 * retrieved from a database using Prisma Client.
 */
export function getUserByUsernameWithAvatarRepository(username: string) {
  return prismaClient.user.findUnique({
    where: { username },
    include: {
      avatar: { select: { height: true, width: true, url: true } },
    },
  });
}
