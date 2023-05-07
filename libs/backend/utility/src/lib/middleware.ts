import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { mkdirSync, unlink } from "fs";
import multer, { MulterError, diskStorage } from "multer";
import path from "path";
import * as yup from "yup";

import {
  Code,
  generateImageFileSchema,
  maxFileSize,
} from "@result-system/shared/utility";

import logger from "./logger";
import HttpError from "./model";

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
      if (err instanceof yup.ValidationError) {
        const { errors, message } = err;
        return next(
          new HttpError({
            message,
            code,
            paths: errors,
          }),
        );
      }
      return next(err);
    }
  };
};

/**
 * The function creates a disk storage configuration for storing files with a unique filename in a
 * specified destination directory.
 * @param {string} dest - The `dest` parameter is a string that represents the destination directory
 * where the uploaded files will be stored. It is used in the `destination` function of the
 * `diskStorage` configuration object to create the directory if it doesn't exist and to pass it to the
 * callback function.
 * @returns The `diskStore` function is returning an instance of `diskStorage` from the `multer`
 * library, which is used to configure the destination and filename for storing uploaded files on disk.
 * The `destination` function creates the destination directory if it doesn't exist and returns the
 * path to it. The `filename` function generates a unique filename for the uploaded file based on the
 * fieldname, original
 */
const diskStore = (dest: string) => {
  return diskStorage({
    destination(_req, _file, cb) {
      mkdirSync(dest, { recursive: true });
      cb(null, dest);
    },
    filename(_, { fieldname, originalname }, cb) {
      const now = Date.now();
      const digit = Math.pow(10, Math.floor(Math.log10(now)) + 1);

      const imageName = `${fieldname}-${now}-${Math.floor(
        Math.random() * digit,
      )}${path.extname(originalname)}`;

      cb(null, imageName);
    },
  });
};

/**
 * This is a TypeScript function that returns a multer middleware for uploading images with size and
 * file validation.
 * @param {string} [dest] - The destination folder where the uploaded image file will be stored. If
 * this parameter is not provided, the file will not be stored and will only be validated and
 * processed.
 * @param [maxSize=1] - The maximum allowed size (in megabytes) for the uploaded image file. If the
 * file size exceeds this limit, the multer middleware will reject the upload. The default value is 1
 * MB if no value is provided.
 * @returns A function that uses the multer library to handle file uploads with options for setting a
 * maximum file size and destination storage location. The function also includes a file filter that
 * uses the yup library to validate the uploaded file against a generated image file schema. If the
 * file passes validation, the function returns a callback with no errors. If the file fails
 * validation, the function returns a callback with an HttpError object containing
 */
export const imageUpload = (dest?: string, maxSize = 1) => {
  return multer({
    storage: dest ? diskStore(dest) : undefined,
    limits: { fileSize: maxFileSize(maxSize) },
    fileFilter(_req, file, cb) {
      try {
        generateImageFileSchema(file.fieldname).validateSync(file);
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
    console.log("Multer", err);

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
