import Router from "express";
import { getAllBuilds, getBuildById } from "../controllers/build.controller.js";

const router = Router();

router.get("/", getAllBuilds);
router.get("/:id", getBuildById);

export default router;