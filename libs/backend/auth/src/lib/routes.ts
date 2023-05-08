import { Router } from "express";

import {
  API_ROUTE,
  ASSETS_DESTINATION,
  imageUpload,
  userRegistrationSchema,
  validateRequest,
} from "@result-system/backend/utility";

import { userRegistration } from "./controller";

const router = Router();

router.post(
  API_ROUTE.auth.registerUser,
  imageUpload(ASSETS_DESTINATION, 5).single("avatar"),
  validateRequest(userRegistrationSchema, 422),
  userRegistration,
);

export default router;
