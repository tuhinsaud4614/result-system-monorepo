import { Router } from "express";

import { verifyJwtAccessToken, verifyRoles } from "@result-system/backend/auth";
import {
  ASSETS_DESTINATION,
  adminClassCreateBodySchema,
  adminGetUsersSchema,
  adminUserIdParamsSchema,
  adminUserUpdateBodySchema,
  imageUpload,
  validateRequest,
} from "@result-system/backend/utility";
import { API_ROUTE } from "@result-system/shared/utility";

import {
  createClassController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "./controller";

const router = Router();

router.use(verifyJwtAccessToken, verifyRoles(["ADMIN"]));

router.get(
  API_ROUTE.admin.users,
  validateRequest(adminGetUsersSchema, 422),
  getUsersController,
);

router
  .route(API_ROUTE.admin.user.static)
  .get(validateRequest(adminUserIdParamsSchema, 400), getUserController)
  .delete(validateRequest(adminUserIdParamsSchema, 400), deleteUserController)
  .patch(
    validateRequest(adminUserIdParamsSchema, 400),
    imageUpload(ASSETS_DESTINATION, 5).single("avatar"),
    validateRequest(adminUserUpdateBodySchema, 422),
    updateUserController,
  );

router
  .route(API_ROUTE.admin.classes)
  .post(
    validateRequest(adminClassCreateBodySchema, 422),
    createClassController,
  );

export default router;
