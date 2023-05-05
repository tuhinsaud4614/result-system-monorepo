import { Redis } from "ioredis";

import environment from "./environment";
import logger from "./logger";

class RedisClient {
  static #instance: Redis;

  private constructor() {}

  public static get instance() {
    if (this.#instance) {
      return this.#instance;
    }
    this.#instance = new Redis(
      `redis://${environment.REDIS_HOST}:${environment.REDIS_PORT}`,
      { lazyConnect: true },
    );
    return this.#instance;
  }
}

const redisClient = RedisClient.instance;

redisClient.on("connect", () => {
  logger.info("Redis connected successfully.");
});

redisClient.on("ready", () => {
  logger.info("Redis is ready to use.");
});

redisClient.on("error", (err) => {
  logger.error(`Redis not connected. ${err.message}`);
});

redisClient.on("end", () => {
  logger.warn("Redis is disconnected.");
});

export default redisClient;
