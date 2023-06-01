import { Router } from "express";

import { verifyJwtAccessToken, verifyRoles } from "@result-system/backend/auth";
import {
  adminGetUsersSchema,
  adminUserIdParamsSchema,
  validateRequest,
} from "@result-system/backend/utility";
import { API_ROUTE } from "@result-system/shared/utility";

import {
  deleteUserController,
  getUserController,
  getUsersController,
} from "./controller";

const router = Router();

router.use(verifyJwtAccessToken, verifyRoles(["ADMIN"]));

router.get(
  API_ROUTE.admin.users,
  validateRequest(adminGetUsersSchema, 422),
  getUsersController,
);

router
  .route(API_ROUTE.admin.deleteUser.static)
  .get(validateRequest(adminUserIdParamsSchema, 400), getUserController)
  .delete(validateRequest(adminUserIdParamsSchema, 400), deleteUserController);

export default router;
