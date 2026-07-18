import { Request, Response } from "express";
import { getBuilds } from "../services/build.service.js";

export const getAllBuilds = (
    req: Request,
    res: Response
) => {
    res.json(getBuilds());
}