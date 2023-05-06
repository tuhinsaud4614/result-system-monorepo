import { PrismaClient } from "@prisma/client";

import { isDev } from "@result-system/shared/utility";

class DbClient {
  static #instance: PrismaClient;

  private constructor() {}

  public static get instance() {
    if (this.#instance) {
      return this.#instance;
    }
    this.#instance = new PrismaClient({ log: isDev() ? ["query"] : undefined });
    return this.#instance;
  }
}

export default DbClient.instance;
