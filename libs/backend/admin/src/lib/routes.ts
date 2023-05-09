import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json("Hello from admin");
});

export default router;
