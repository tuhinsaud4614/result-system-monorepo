import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { type AnyZodObject, ZodError } from "zod";

import type { Code } from "@result-system/shared-types";

import logger from "./logger";
import HttpError from "./model";

/**
 * It takes a Zod schema and an optional HTTP status code, and returns a middleware function that
 * validates the request against the schema
 * @param {AnyZodObject} schema - AnyZodObject - The Zod schema to validate the request against.
 * @param [code=500] - The HTTP status code to return if the validation fails.
 * @returns A function that takes in a schema, code, and returns a function that takes in a request,
 * response, and next function.
 */
export default function validateRequest(
  schema: AnyZodObject,
  code: Code = 500,
) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const { message, flatten } = err;
        return next(
          new HttpError({ message, code, paths: flatten().fieldErrors }),
        );
      }

      return next(
        new HttpError({
          message: err instanceof Error ? err.message : "Something went wrong.",
          code,
        }),
      );
    }
  };
}

/**
 * It creates a new error with the message 'Could not found this route' and passes it to the next
 * function
 * @param _ - The Request object
 * @param __ - The response object
 * @param next - The next function is a function that you call when you are done with your middleware.
 */
export const notFoundHandler: RequestHandler = (_, __, next) => {
  next(new HttpError({ message: "Could not found this route.", code: 404 }));
};

/**
 * If the response headers have already been sent, then log a warning and call the next error handler.
 * Otherwise, log the error message and send a 500 response with the error message
 * @param err - The error object
 * @param _ - The Request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns A function that takes in 4 parameters.
 */
export const errorHandler: ErrorRequestHandler = (err, __, res, next) => {
  if (res.headersSent) {
    logger.warn("Header already sent.");
    return next(err);
  }

  if (err instanceof HttpError) {
    logger.error(err.message);
    return res.status(err.code).json(err.toObj());
  }
  logger.error(err.message);

  return res.status(500).json(
    new HttpError({
      message: "Something went wrong.",
      code: 500,
      detail: "An unknown error occurs.",
    }).toObj(),
  );
};
