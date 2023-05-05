import { Router } from "express";

import { userRoutes } from "@result-system/backend-user";

const router = Router();

router.use("/user", userRoutes);

export default router;
