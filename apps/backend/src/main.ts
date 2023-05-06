import {
  API_START_ROUTE,
  SIGNALS,
  environment,
  logger,
  redisClient,
} from "@result-system/backend/utility";
import { isDev } from "@result-system/shared/utility";

import app from "./app";

/**
 * It takes an object with a signal and a server property, and then logs the signal and closes the
 * server
 * @param  - signal: The signal that was received.
 */
function shutdown({
  signal,
  server,
}: {
  signal: (typeof SIGNALS)[number];
  server: ReturnType<typeof app.listen>;
}) {
  logger.info(`Got signal ${signal} Good bye.`);

  server.close(() => {
    process.exit(0);
  });
}

/**
 * It logs the error, closes the server, and exits the process
 * @param {Error | unknown} error - Error | unknown
 * @param server - The server object returned by app.listen().
 */
function unexpectedErrorHandler(
  error: Error | unknown,
  server: ReturnType<typeof app.listen>,
) {
  logger.error(error);
  server.close(() => {
    logger.info("Server closed");
    process.exit(1);
  });
}

(async () => {
  try {
    await redisClient.connect();

    const server = app.listen(environment.PORT, () => {
      logger.info(`App running on ${environment.HOST}:${environment.PORT}`);
      if (isDev()) {
        logger.info(
          `Docs available at ${environment.HOST}:${environment.PORT}${API_START_ROUTE.v1}/docs`,
        );
      }
    });

    SIGNALS.forEach((signal) => {
      process.on(signal, () => shutdown({ signal, server }));
    });
    process.on("uncaughtException", (error) =>
      unexpectedErrorHandler(error, server),
    );
    process.on("unhandledRejection", (error) =>
      unexpectedErrorHandler(error, server),
    );
  } catch (error) {
    process.exit(1);
  }
})();
