import prismaClient from "./prisma-client";

export class UserRepository {
  /**
   * Returns the number of users in the database.
   * @returns {Promise<number>} A promise that resolves to the number of users.
   */
  static countUser() {
    return prismaClient.user.count();
  }
}
