import Router from "express";
import { getAllBuilds } from "../controllers/build.controller.js";

const router = Router();

router.get("/", getAllBuilds);

export default router;