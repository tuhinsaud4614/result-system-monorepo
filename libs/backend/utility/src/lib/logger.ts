import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { isDev } from "@result-system/shared/utility";

const { printf, combine, timestamp, colorize, errors, json } = format;

const logFormat = printf(
  ({ level, message, timestamp: tp, stack }) =>
    `[${tp}] ${level} : ${stack || message}`,
);

const logger = isDev()
  ? createLogger({
      format: combine(
        colorize(),
        timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        errors({ stack: true }),
        logFormat,
      ),
      transports: [new transports.Console()],
    })
  : createLogger({
      format: combine(timestamp(), errors({ stack: true }), json()),
      defaultMeta: { service: "user-service" },
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          level: "error",
          filename: path.join(process.cwd(), "logs", "error-%DATE%.log"),
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
        new DailyRotateFile({
          filename: path.join(process.cwd(), "logs", "combined-%DATE%.log"),
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
    });

export default logger;
