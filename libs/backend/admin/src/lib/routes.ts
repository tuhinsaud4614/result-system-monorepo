import { Router } from "express";

import { verifyJwtAccessToken, verifyRoles } from "@result-system/backend/auth";
import {
  adminGetUsersSchema,
  validateRequest,
} from "@result-system/backend/utility";
import { API_ROUTE } from "@result-system/shared/utility";

import { getUsersController } from "./controller";

const router = Router();

router
  .use(verifyJwtAccessToken, verifyRoles(["ADMIN"]))
  .get(
    API_ROUTE.admin.users,
    validateRequest(adminGetUsersSchema, 422),
    getUsersController,
  );

export default router;
