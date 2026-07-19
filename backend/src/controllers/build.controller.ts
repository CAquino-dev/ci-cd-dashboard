import { Request, Response } from "express";
import { getBuilds, getBuildbyId } from "../services/build.service.js";

export const getAllBuilds = (
    req: Request,
    res: Response
) => {
    res.json(getBuilds());
}

export const getBuildById = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);
    const build = getBuildbyId(id);

    if (build) {
        res.json(build);
    } else {
        res.status(404).json({ message: "Build not found" });
    }
}   