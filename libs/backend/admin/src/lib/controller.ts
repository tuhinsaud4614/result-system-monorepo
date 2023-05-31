import { type RequestHandler } from "express";

import { HttpError, responseAsObj } from "@result-system/backend/utility";
import { IDParams, OffsetQuery } from "@result-system/shared/utility";

import { deleteUserService, getUsersService } from "./service";

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
