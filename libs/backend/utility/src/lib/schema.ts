import * as yup from "yup";

import {
  createClassInputSchema,
  idParamsSchema,
  loginInputSchema,
  offsetSchema,
  registerInputSchema,
  updateUserInputSchema,
} from "@result-system/shared/utility";

export const userRegistrationSchema = yup.object({
  body: registerInputSchema,
});

export const userLoginSchema = yup.object({
  body: loginInputSchema,
});

export const queryWithOffsetSchema = yup.object({
  query: offsetSchema,
});

export const adminUserIdParamsSchema = yup.object({
  params: idParamsSchema("User"),
});

export const adminUserUpdateBodySchema = yup.object({
  body: updateUserInputSchema,
});

export const adminClassCreateBodySchema = yup.object({
  body: createClassInputSchema,
});
