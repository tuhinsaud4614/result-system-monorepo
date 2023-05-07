import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { unlink } from "fs";
import { MulterError } from "multer";
import type { AnySchema, ValidationError } from "yup";

import type { Code } from "@result-system/shared/utility";

import logger from "./logger";
import HttpError from "./model";

export const validateRequest = (schema: AnySchema, code: Code = 500) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        file: req.file,
        files: req.files,
      });
      return next();
    } catch (er) {
      const { message } = er as ValidationError;
      return next(new HttpError({ message, code }));
    }
  };
};

/**
 * This function handles 404 errors by passing a new HttpError object with a message and code to the
 * next middleware.
 * @param _req - _req is a parameter that represents the incoming request object in an Express
 * middleware function. It contains information about the HTTP request made by the client, such as the
 * request method, URL, headers, and body.
 * @param __res - __res is a parameter that represents the response object in an Express middleware
 * function. It is typically used to send a response back to the client, such as setting headers,
 * status codes, and sending data. In this specific code snippet, the __res parameter is not being
 * used, as the middleware function
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It takes an optional argument which is an error object. If an error object is passed to
 * `next`, Express will skip all remaining middleware functions and send the error to the client. If no
 * error
 */
export const notFoundHandler: RequestHandler = (_req, __res, next) => {
  next(new HttpError({ message: "Could not found this route.", code: 404 }));
};

/**
 * This is an error handling middleware function in TypeScript that handles different types of errors
 * and returns appropriate HTTP responses.
 * @param err - The error object that was thrown or passed to the next() function in the middleware
 * chain.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request, such as the request headers, query parameters, and request body.
 * @param res - `res` is the response object that is used to send the HTTP response back to the client.
 * It contains methods like `status()` to set the HTTP status code, `json()` to send a JSON response,
 * and `send()` to send a plain text response. In this error handler, `
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next middleware function in
 * the chain.
 * @returns The `errorHandler` function is returning a JSON response with an error message, status
 * code, and details. The specific response returned depends on the type of error that occurred. If the
 * error is a `MulterError`, a 400 Bad Request response is returned with the error message and code. If
 * the error is an `HttpError`, the response will have the status code and message specified in
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    logger.warn("Header already sent.");
    return next(err);
  }

  if (err instanceof MulterError) {
    if (req.file) {
      unlink(req.file.path, (linkErr) => {
        if (linkErr) {
          logger.error(linkErr?.message);
        }
      });
    }
    logger.error(err.message);

    return res.status(400).json(
      new HttpError({
        message: err.message,
        code: 400,
        detail: err.code,
      }).toObj(),
    );
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
