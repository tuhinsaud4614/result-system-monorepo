import { type RequestHandler } from "express";
import _ from "lodash";

import { HttpError, responseAsObj } from "@result-system/backend/utility";
import {
  CreateClassInput,
  IDParams,
  Offset,
  UpdateUserInput,
} from "@result-system/shared/utility";

import {
  createClassService,
  deleteClassService,
  deleteUserService,
  getClassService,
  getClassesService,
  getUserService,
  getUsersService,
  updateUserService,
} from "./service";

/**
 * This is a function that exports a controller to get users data and returns a JSON
 * response.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, headers, query parameters, and body. In this
 * case, it is used to extract the query parameters to pass to the `getUsersService` function.
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `http.ServerResponse` class in Node.js. The `res` object has methods like
 * `res.status()` to set the HTTP status code, `res.json()` to send
 * @param next - `next` is a function that is called to pass control to the next middleware function.
 * It is typically used to handle errors or to pass control to the next middleware function in the
 * chain.
 * @returns This code is returning a response with a status code of 200 and a JSON object containing
 * the data returned from the `getUsersService` function. If `getUsersService` returns an instance of
 * `HttpError`, the code will call the `next` function with the error object.
 */
export const getUsersController: RequestHandler<
  unknown,
  unknown,
  unknown,
  Offset
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

/**
 * This is a function that exports a controller to get classes data and returns a JSON
 * response.
 * @param req - The `req` parameter is an object that represents the HTTP request made to the server.
 * It contains information about the request, such as the request method, headers, URL, query
 * parameters, and body. In this case, the `req` parameter is used to extract the query parameters from
 * the URL
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `http.ServerResponse` class in Node.js. The `res` object has methods like
 * `res.status()` and `res.json()` that are used to set the HTTP status
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next middleware function in
 * the chain.
 * @returns This code exports a function called `getClassesController` which is a request handler that
 * takes in a request, response, and next function as parameters. It uses the `getClassesService`
 * function to retrieve data based on the query parameters of the request. If the data is an instance
 * of `HttpError`, it calls the `next` function with the error. Otherwise, it returns a JSON response
 */
export const getClassesController: RequestHandler<
  unknown,
  unknown,
  unknown,
  Offset
> = async (req, res, next) => {
  const data = await getClassesService(req.query);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(200).json(responseAsObj(data));
};

/**
 * This function handles a GET request to retrieve a class controller by ID and returns a JSON
 * response.
 * @param req - req is the request object that contains information about the incoming HTTP request,
 * such as the request headers, request parameters, and request body. It is an instance of the Express
 * Request object.
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `Response` class from the `express` module. The `status()` method is used to set
 * the HTTP status code of the response, and the `json()` method is
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to pass control to the next middleware function
 * in the chain.
 * @returns This code is returning a request handler function that retrieves data for a specific class
 * using the ID parameter from the request URL. The retrieved data is then checked for errors and
 * either returned as a JSON response object with a 200 status code or passed to the next middleware
 * function if there is an error.
 */
export const getClassController: RequestHandler<IDParams> = async (
  req,
  res,
  next,
) => {
  const data = await getClassService(req.params.id);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(200).json(responseAsObj(data));
};

/**
 * This function creates a class controller that handles requests to create a new class and returns a
 * JSON response.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, etc. It is passed as the
 * first parameter to the RequestHandler function.
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `http.ServerResponse` class in Node.js. The `res` object has methods like
 * `res.status()`, `res.json()`, `res.send()`, etc.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to pass control to the final middleware function
 * that sends the response back to the client.
 * @returns This code is returning a response to a request to create a class. If the
 * `createClassService` function returns an instance of `HttpError`, the function will call the `next`
 * function with the error as an argument. Otherwise, it will return a JSON response with a status code
 * of 201 and the data returned by `createClassService` as an object.
 */
export const createClassController: RequestHandler<
  unknown,
  unknown,
  CreateClassInput
> = async (req, res, next) => {
  const data = await createClassService(req.body);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(201).json(responseAsObj(data));
};

/**
 * This function handles a DELETE request to delete a class and returns a 204 status code if
 * successful.
 * @param req - The request object contains information about the HTTP request that was made, such as
 * the request method, headers, and any data that was sent in the request body.
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `Response` class from the Express framework. In this specific code snippet, `res`
 * is used to send a 204 status code and an empty JSON response back to the
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to pass control to the next middleware function
 * after the current middleware function has completed its task.
 * @returns a response with a status code of 204 (No Content) and an empty JSON object.
 */
export const deleteClassController: RequestHandler<IDParams> = async (
  req,
  res,
  next,
) => {
  const data = await deleteClassService(req.params.id);

  if (data instanceof HttpError) {
    return next(data);
  }

  return res.status(204).json();
};
