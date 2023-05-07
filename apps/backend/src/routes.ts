import { Router } from "express";

import { adminRoutes } from "@result-system/backend/admin";
import { API_ROUTE } from "@result-system/backend/utility";

const router = Router();

router.use(API_ROUTE.auth.main, adminRoutes);
router.use("/admin", adminRoutes);

export default router;
