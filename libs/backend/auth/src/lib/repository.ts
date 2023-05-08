import {
  Pretty,
  UserCreateInput,
  prismaClient,
} from "@result-system/backend/utility";

/**
 * This function creates a user in a Prisma database, including an optional avatar.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param inputs - The `inputs` parameter is an object of type `Pretty<UserCreateInput>`, which
 * contains the data needed to create a new user in the database. The `UserCreateInput` type is likely
 * defined in the Prisma schema and contains fields such as `name`, `email`, `password`,
 * @returns The `createUser` function is returning a Promise that resolves to a newly created user
 * object in the database using the `prisma` client. The user object is created using the `inputs`
 * object passed as an argument to the function, with the `avatar` property being handled separately to
 * create a new avatar object if it exists.
 */
export function createUser(inputs: Pretty<UserCreateInput>) {
  const { avatar, ...rest } = inputs;
  return prismaClient.user.create({
    data: {
      ...rest,
      avatar: avatar && { create: { ...avatar } },
    },
  });
}
