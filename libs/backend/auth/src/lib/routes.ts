import { Router } from "express";
import rateLimit from "express-rate-limit";
import ms from "ms";

import {
  API_ROUTE,
  ASSETS_DESTINATION,
  HttpError,
  imageUpload,
  userLoginSchema,
  userRegistrationSchema,
  validateRequest,
} from "@result-system/backend/utility";
import { isDev } from "@result-system/shared/utility";

import {
  logoutController,
  tokenController,
  userLoginController,
  userRegistrationController,
} from "./controller";
import { verifyJwtAccessToken } from "./middleware";

const router = Router();

router.post(
  API_ROUTE.auth.registerUser,
  imageUpload(ASSETS_DESTINATION, 5).single("avatar"),
  validateRequest(userRegistrationSchema, 422),
  userRegistrationController,
);

router.post(
  API_ROUTE.auth.loginUser,
  rateLimit({
    windowMs: ms(`${isDev() ? 5 : 15}m`), // 5 or 15 minutes
    max: 5, // Maximum 5 login attempts
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler(_req, _res, next) {
      return next(
        new HttpError({
          code: 429,
          message: "Too many login attempts. Please try again later.",
        }),
      );
    },
  }),
  validateRequest(userLoginSchema, 422),
  userLoginController,
);
router.get(API_ROUTE.auth.token, tokenController);
router.post(API_ROUTE.auth.logoutUser, verifyJwtAccessToken, logoutController);

export default router;
