import Router from "express";
import { getAllRepositories } from "../controllers/repository.controller.js";
import { getAllBuilds, getBuildById } from "../controllers/build.controller.js";

const router = Router();

router.get("/", getAllRepositories);
router.get(
  "/:owner/:repo/builds",
  getAllBuilds
);

router.get(
  "/:owner/:repo/builds/:runId",
  getBuildById
);

export default router;