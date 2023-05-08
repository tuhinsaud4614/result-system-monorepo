import type { RequestHandler } from "express";

import {
  HttpError,
  type UserRegistrationBody,
  responseAsObj,
} from "@result-system/backend/utility";

import { userRegistrationService } from "./service";

/**
 * This is a function that handles user registration requests by calling a service and
 * returning a JSON response.
 * @param req - `req` is an object that represents the HTTP request made by the client. It contains
 * information such as the request method, headers, URL, and body. In this specific code snippet, `req`
 * is being used to access the request body (`req.body`) and file (`req.file`) that
 * @param res - `res` is an object representing the HTTP response that will be sent back to the client.
 * It contains methods for setting the response status, headers, and body. In this specific code
 * snippet, `res` is used to send a JSON response with a status code of 201 (created) and
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to handle errors or to pass control to the final route handler. If
 * an error occurs in the current middleware function, it can call `next` with an error object to pass
 * @returns The code is returning a response to a user registration request. If the user registration
 * is successful, it will return a JSON response with a status code of 201 (created). If there is an
 * error, it will return an HttpError object with the appropriate error status code.
 */
export const userRegistration: RequestHandler<
  unknown,
  unknown,
  UserRegistrationBody
> = async (req, res, next) => {
  const data = await userRegistrationService(req.body, req.file);
  if (data instanceof HttpError) {
    return next(data);
  }
  return res.status(201).json(responseAsObj(data));
};
