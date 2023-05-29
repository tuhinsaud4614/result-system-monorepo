import { Router } from "express";

import { adminRoutes } from "@result-system/backend/admin";
import { authRoutes } from "@result-system/backend/auth";
import { API_ROUTE } from "@result-system/shared/utility";

const router = Router();

router.use(API_ROUTE.auth.main, authRoutes);
router.use(API_ROUTE.admin.main, adminRoutes);

export default router;
