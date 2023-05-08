import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { unlink } from "fs";
import { mkdir } from "fs/promises";
import multer, { MulterError, diskStorage } from "multer";
import * as yup from "yup";

import {
  Code,
  generateCRUDFailedErrorMessage,
  generateImageFileSchema,
  maxFileSize,
} from "@result-system/shared/utility";

import logger from "./logger";
import { generateImageName } from "./main";
import { HttpError } from "./model";

/**
 * The function validates a request using a given schema and returns an error if the validation
 * fails.
 * @param schema - The schema parameter is a Yup schema object that defines the shape and
 * validation rules for the request data. It can be used to validate the request body, query
 * parameters, route parameters, and files.
 * @param {Code} [code=500] - The `code` parameter is an optional parameter that specifies the HTTP
 * status code to be returned in case of a validation error. The default value is 500 (Internal
 * Server Error).
 * @returns A higher-order function that takes in a schema and a code, and returns an asynchronous
 * middleware function that validates the request against the schema. If the validation fails, it
 * throws a HttpError with the appropriate message, code, and paths. If the validation succeeds, it
 * calls the next middleware function.
 */
export const validateRequest = (schema: yup.AnySchema, code: Code = 500) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
          file: req.file,
          files: req.files,
        },
        { abortEarly: false },
      );
      return next();
    } catch (err) {
      const { errors, message } = err as yup.ValidationError;
      return next(
        new HttpError({
          message,
          code,
          paths: errors,
        }),
      );
    }
  };
};

/**
 * This is a function that returns a disk storage configuration for file uploads, including
 * destination and filename generation.
 * @param {string} dest - The `dest` parameter is a string representing the destination directory where
 * uploaded files will be stored on disk.
 * @returns The `diskStore` function is returning an instance of `diskStorage` from the `multer`
 * library. This instance has two methods defined: `destination` and `filename`. The `destination`
 * method creates a directory at the specified `dest` path and returns the path to the directory. If an
 * error occurs during the creation of the directory, it returns an instance of `HttpError`
 */
const diskStore = (dest: string) => {
  return diskStorage({
    async destination(_req, _file, cb) {
      try {
        await mkdir(dest, { recursive: true });
        cb(null, dest);
      } catch (error) {
        cb(
          new HttpError({
            message: generateCRUDFailedErrorMessage("file", "upload"),
            code: 500,
          }),
          dest,
        );
      }
    },
    filename(_, { fieldname, originalname }, cb) {
      const { withExt } = generateImageName(fieldname, originalname);
      cb(null, withExt);
    },
  });
};

/**
 * This is a function that returns a multer middleware for uploading images with optional
 * destination and maximum file size parameters, and includes validation using a generated image file
 * schema.
 * @param {string} [dest] - The destination folder where the uploaded files will be stored. If no
 * destination is provided, the files will not be stored and will only be processed by the fileFilter
 * function.
 * @param [maxSize=1] - The `maxSize` parameter is a number that represents the maximum allowed file
 * size in megabytes (MB) for the uploaded image. It is used to set the `fileSize` limit in the
 * `limits` option of the `multer` middleware. If the uploaded file exceeds this limit,
 * @returns A function that uses the multer library to handle file uploads. The function takes in two
 * optional parameters: `dest` (a string representing the destination folder for uploaded files) and
 * `maxSize` (a number representing the maximum file size in megabytes). The function returns a multer
 * middleware that handles file storage, file size limits, and file validation using a Yup schema. If
 * the file passes validation,
 */
export const imageUpload = (dest?: string, maxSize = 1) => {
  return multer({
    storage: dest ? diskStore(dest) : undefined,
    limits: { fileSize: maxFileSize(maxSize) },
    async fileFilter(_req, file, cb) {
      try {
        await generateImageFileSchema(file.fieldname).validate(file, {
          abortEarly: false,
        });
        cb(null, true);
      } catch (err) {
        const { errors, message } = err as yup.ValidationError;
        return cb(
          new HttpError({
            message,
            code: 422,
            paths: errors,
          }),
        );
      }
    },
  });
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
      message: "Something went wrong",
      code: 500,
      detail: "An unknown error occurs",
    }).toObj(),
  );
};
