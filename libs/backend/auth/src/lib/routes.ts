import { Router } from "express";

import {
  API_ROUTE,
  userRegistrationSchema,
  validateRequest,
} from "@result-system/backend/utility";

const router = Router();

router.post(
  API_ROUTE.auth.registerUser,
  validateRequest(userRegistrationSchema, 422),
);

export default router;
