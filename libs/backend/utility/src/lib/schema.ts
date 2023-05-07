import * as yup from "yup";

import { registerInputSchema } from "@result-system/shared/utility";

export const userRegistrationSchema = yup.object({
  body: registerInputSchema,
});
