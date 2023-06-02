import { type RequestHandler } from "express";
import _ from "lodash";

import { HttpError, responseAsObj } from "@result-system/backend/utility";
import {
  IDParams,
  OffsetQuery,
  UpdateUserInput,
} from "@result-system/shared/utility";

import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "./service";

/**
 * This is a function that exports a controller for getting users, which logs the request
 * query, calls a service function to retrieve user data, and returns a JSON response.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, headers, URL, query parameters, and body. In
 * this case, the `req` object is used to extract the query parameters from the URL using `req.query
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `http.ServerResponse` class in Node.js. The `res` object has methods like
 * `res.status()`, `res.json()`, `res.send()`, etc.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next middleware function in
 * the chain.
 * @returns This code is returning a response to a GET request for users. It is using the
 * `getUsersService` function to retrieve the data and then returning a JSON response with a status
 * code of 200 and the retrieved data as an object. If there is an error, it will return the error
 * using the `next` function.
 */
export const getUsersController: RequestHandler<
  IDParams,
  unknown,
  unknown,
  OffsetQuery
> = async (req, res, next) => {
  const data = await getUsersService(req.query);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(200).json(responseAsObj(data));
};

/**
 * This function handles a GET request to retrieve user data and returns a JSON response.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, query parameters, and request body. It is passed
 * as the first parameter to the getUserController function.
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `http.ServerResponse` class in Node.js. In this code snippet, `res` is used to
 * send a JSON response with a status code of 200 and the data
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next function in the chain of
 * middleware.
 * @returns This code is returning a request handler function that retrieves user data by calling the
 * `getUserService` function with the user ID passed in the request parameters. If the `getUserService`
 * function returns an instance of `HttpError`, the function calls the `next` function with the error
 * to pass it to the error handling middleware. Otherwise, the function returns a JSON response with
 * the user data in the body
 */
export const getUserController: RequestHandler<IDParams> = async (
  req,
  res,
  next,
) => {
  const data = await getUserService(req.params.id);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(200).json(responseAsObj(data));
};

/**
 * This function handles a DELETE request to delete a user and returns a 204 status code if successful.
 * @param req - The request object contains information about the incoming HTTP request, such as the
 * request headers, request parameters, and request body.
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `Response` class from the Express framework. In this code snippet, it is used to
 * send a 204 status code and an empty JSON response back to the client after a
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next function in the chain of
 * middleware.
 * @returns a response with a status code of 204 (No Content) and an empty JSON object.
 */
export const deleteUserController: RequestHandler<IDParams> = async (
  req,
  res,
  next,
) => {
  const data = await deleteUserService(req.params.id);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(204).json();
};

/**
 * This is a function that updates a user's data and returns a JSON response.
 * @param req - `req` is an object that represents the HTTP request made by the client. It contains
 * information such as the request method, headers, URL, and body. In this specific code snippet, `req`
 * is used to extract the request body (`req.body`), request parameters (`req.params`),
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * is an instance of the `http.ServerResponse` class in Node.js. The `res` object has methods like
 * `res.status()`, `res.json()`, `res.send()`, etc.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next middleware function in
 * the chain.
 * @returns The `updateUserController` function is returning a response with a status code of 200 and a
 * JSON object that contains the data returned from the `updateUserService` function. If the
 * `updateUserService` function returns an instance of `HttpError`, the function will call the `next`
 * function with the error as an argument.
 */
export const updateUserController: RequestHandler<
  IDParams,
  unknown,
  UpdateUserInput
> = async (req, res, next) => {
  const inputs = _.omit(req.body, "confirmPassword");

  const data = await updateUserService(req.params.id, inputs, req.file);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(200).json(responseAsObj(data));
};
