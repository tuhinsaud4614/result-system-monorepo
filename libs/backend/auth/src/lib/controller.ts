import type { RequestHandler } from "express";
import _ from "lodash";
import ms from "ms";

import {
  AuthenticationError,
  HttpError,
  environment,
  responseAsObj,
} from "@result-system/backend/utility";
import type { LoginInput, RegisterInput } from "@result-system/shared/utility";

import {
  loginService,
  logoutService,
  tokenService,
  userRegistrationService,
} from "./service";

/**
 * This is a TypeScript function that handles user registration requests by calling a service and
 * returning a JSON response.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, etc. It is passed as the
 * first parameter to the RequestHandler function.
 * @param res - `res` is an object representing the HTTP response that will be sent back to the client.
 * It contains methods and properties that allow you to set the response status code, headers, and
 * body. In this specific code snippet, `res` is used to send a JSON response with a status code of
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to pass control to the next middleware function
 * after the current middleware function has completed its task.
 * @returns The code is returning a response with a status code of 201 (created) and a JSON object that
 * is the result of calling the `responseAsObj` function on the `data` object returned from the
 * `userRegistrationService` function. If the `data` object is an instance of the `HttpError` class,
 * the code will call the `next` function with the `data`
 */
export const userRegistrationController: RequestHandler<
  unknown,
  unknown,
  RegisterInput
> = async (req, res, next) => {
  const data = await userRegistrationService(req.body, req.file);
  if (data instanceof HttpError) {
    return next(data);
  }
  return res.status(201).json(responseAsObj(data));
};

/**
 * This is a function that handles user login requests, sets a refresh token cookie, and
 * returns an access token.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information about the request such as the request method, headers, URL, and body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client making the request. It contains methods and properties that allow you to set the response
 * status, headers, and body. In this specific code snippet, it is used to set a cookie with the
 * refresh token
 * @param next - `next` is a function that is called to pass control to the next middleware function.
 * It is typically used to handle errors or to move on to the next middleware function in the chain.
 * @returns The code is returning a response with a status code of 200 and a JSON object containing an
 * access token. If there is an error, it will call the `next` function with the error object.
 */
export const userLoginController: RequestHandler<
  unknown,
  unknown,
  LoginInput
> = async (req, res, next) => {
  const data = await loginService(req.body);

  if (data instanceof HttpError) {
    return next(data);
  }

  const { accessToken, refreshToken } = data;

  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: "none", // cross-site cookie
    maxAge: ms(environment.REFRESH_TOKEN_EXPIRES), // cookie expiry
  });

  return res.status(200).json(responseAsObj({ accessToken }));
};

/**
 * This function handles requests for a token and returns a JSON response containing an access token.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, cookies, etc.
 * @param res - `res` is an object representing the HTTP response that will be sent back to the client.
 * It contains methods and properties that allow you to set the response status, headers, and body. In
 * this specific code snippet, `res` is used to send a JSON response with a status code of
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next function in the chain of
 * middleware functions.
 * @returns The code is returning a JSON response with a status code of 201 (created) and an object
 * containing an access token. The access token is obtained by calling the `tokenService` function with
 * the JWT token stored in the `req.cookies.jwt` property. If the `tokenService` function returns an
 * instance of `HttpError`, the error is passed to the `next` middleware function. Otherwise
 */
export const tokenController: RequestHandler = async (req, res, next) => {
  const data = await tokenService(req.cookies.jwt);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(201).json(responseAsObj({ accessToken: data }));
};

/**
 * This function logs out a user by clearing their JWT cookie and calling a logout service.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information about the request such as the request method, headers, URL, and any data
 * sent in the request body.
 * @param res - The `res` parameter is an object representing the HTTP response that will be sent back
 * to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this specific code snippet, `res` is used to clear the JWT cookie and send a
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to handle errors or to move on to the next middleware function in
 * the stack.
 * @returns a Promise that resolves to a JSON response with a status code of 204 (No Content) and a
 * message indicating that the user has successfully logged out. The response also includes a cookie
 * named "jwt" that is cleared with the specified options (httpOnly, secure, sameSite).
 */
export const logoutController: RequestHandler = async (req, res, next) => {
  const userId = _.get(req, "user.id") as string | undefined;

  if (!userId) {
    return next(new AuthenticationError());
  }

  await logoutService(userId);

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  return res.status(204).json(responseAsObj(null, "You successfully logout"));
};
