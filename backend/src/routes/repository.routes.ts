import Router from "express";
import { getAllRepositories } from "../controllers/repository.controller.js";

const router = Router();

router.get("/", getAllRepositories);

export default router;