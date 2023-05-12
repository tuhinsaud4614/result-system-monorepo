import { UserRole } from "@prisma/client";
import { type RequestHandler } from "express";
import { verify as jwtVerify } from "jsonwebtoken";
import _ from "lodash";

import {
  AuthenticationError,
  deserializeUserWithAvatar,
  environment,
} from "@result-system/backend/utility";

/**
 * This function verifies a JWT access token in a request header and adds the decoded user information
 * to the request object.
 * @param req - The request object represents the HTTP request that is being made to the server. It
 * contains information about the request, such as the HTTP method, headers, and body.
 * @param _res - The `_res` parameter is a reference to the response object of the HTTP request.
 * However, it is not being used in this function and can be omitted.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It takes an optional argument which is an error object. If an error is passed to `next`,
 * Express will skip all remaining middleware functions and send the error to the client. If no error
 * is
 * @returns The function `verifyJwtAccessToken` returns the result of calling the `next` function,
 * which is typically used to pass control to the next middleware function in the chain. If an error
 * occurs during the execution of the function, the error is passed to the `next` function as an
 * argument.
 */
export const verifyJwtAccessToken: RequestHandler = (req, _res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return next(new AuthenticationError());
  }

  try {
    const token = authToken.replace(/^Bearer\s/, "");
    const decoded = jwtVerify(token, environment.ACCESS_TOKEN_SECRET_KEY);
    const user = deserializeUserWithAvatar(decoded);
    _.merge(req, { user });
    return next();
  } catch (error) {
    return next(new AuthenticationError(undefined, (error as Error).message));
  }
};

/**
 * This function verifies if a user has the required roles to access a certain resource.
 * @param {UserRole[]} roles - an array of UserRole values that are allowed to access a certain route
 * or perform a certain action.
 * @returns The function `verifyRoles` is returning a request handler function that takes in three
 * parameters: `req`, `_res`, and `next`. The request handler function checks if the `role` of the
 * authenticated user is included in the `roles` array passed as an argument to `verifyRoles`. If the
 * user is not authenticated or their role is not included in the `roles` array, an `
 */
export function verifyRoles(roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    const role = _.get(req, "user.role");
    const isValidUser = !!role && roles.includes(role);

    if (!isValidUser) {
      return next(new AuthenticationError());
    }

    return next();
  };
}
