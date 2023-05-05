import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - Hello
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/", (_, res) => {
  res.status(200).json("Hello");
});

export default router;
