import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    status: "healthy",
    service: "ci-cd-dashboard-api",
    version: "0.1.0",
  });
});

export default router;