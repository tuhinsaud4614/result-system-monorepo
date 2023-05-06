import { Router } from "express";

import { adminRoutes } from "@result-system/backend/admin";

const router = Router();

router.use("/admin", adminRoutes);

export default router;
