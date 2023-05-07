import type { RequestHandler, Response } from "express";

import {
  type UserRegistrationBody,
  generateUserName,
  responseAsObj,
} from "@result-system/backend/utility";

let count = 10;

export const userRegistration: RequestHandler<
  unknown,
  unknown,
  UserRegistrationBody
> = (req, res, _next): Response => {
  const { role } = req.body;
  const username = generateUserName(role, count);
  count++;
  return res.json(responseAsObj(username));
};
