import { Router } from "express";

import { verifyJwtAccessToken, verifyRoles } from "@result-system/backend/auth";
import {
  ASSETS_DESTINATION,
  adminClassCreateBodySchema,
  adminUserUpdateBodySchema,
  idParamsSchema,
  imageUpload,
  queryWithOffsetSchema,
  validateRequest,
} from "@result-system/backend/utility";
import { API_ROUTE } from "@result-system/shared/utility";

import {
  createClassController,
  deleteClassController,
  deleteUserController,
  getClassController,
  getClassesController,
  getUserController,
  getUsersController,
  updateUserController,
} from "./controller";

const router = Router();

router.use(verifyJwtAccessToken, verifyRoles(["ADMIN"]));

router.get(
  API_ROUTE.admin.users,
  validateRequest(queryWithOffsetSchema, 400),
  getUsersController,
);

router
  .route(API_ROUTE.admin.user.static)
  .get(validateRequest(idParamsSchema, 400), getUserController)
  .delete(validateRequest(idParamsSchema, 400), deleteUserController)
  .patch(
    validateRequest(idParamsSchema, 400),
    imageUpload(ASSETS_DESTINATION, 5).single("avatar"),
    validateRequest(adminUserUpdateBodySchema, 422),
    updateUserController,
  );

router
  .route(API_ROUTE.admin.classes)
  .get(validateRequest(queryWithOffsetSchema, 400), getClassesController)
  .post(
    validateRequest(adminClassCreateBodySchema, 422),
    createClassController,
  );

router
  .route(API_ROUTE.admin.class.static)
  .get(validateRequest(idParamsSchema, 400), getClassController)
  .delete(validateRequest(idParamsSchema, 400), deleteClassController);

export default router;
