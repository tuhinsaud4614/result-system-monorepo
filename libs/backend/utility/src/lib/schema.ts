import * as yup from "yup";

import {
  loginInputSchema,
  offsetQuerySchema,
  registerInputSchema,
} from "@result-system/shared/utility";

export const userRegistrationSchema = yup.object({
  body: registerInputSchema,
});

export const userLoginSchema = yup.object({
  body: loginInputSchema,
});

export const adminGetUsersSchema = yup.object({
  query: offsetQuerySchema,
});
