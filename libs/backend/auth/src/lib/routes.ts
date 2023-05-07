import { Router } from "express";
import path from "path";

import {
  API_ROUTE,
  imageUpload,
  userRegistrationSchema,
  validateRequest,
} from "@result-system/backend/utility";

import { userRegistration } from "./controller";

const router = Router();

router.post(
  API_ROUTE.auth.registerUser,
  imageUpload(path.join(__dirname, "assets"), 5).single("avatar"),
  validateRequest(userRegistrationSchema, 422),
  userRegistration,
);

export default router;
