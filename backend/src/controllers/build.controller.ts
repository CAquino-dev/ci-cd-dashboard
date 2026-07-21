import { Request, Response } from "express";
import { getBuilds, getBuildbyId } from "../services/build.service.js";

export const getAllBuilds = async (
    req: Request,
    res: Response
) => {
    try {
        const builds = await getBuilds(); 
        res.json(builds);  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch GitHub workflow runs",
        });
    }
}

export const getBuildById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const build = await getBuildbyId(id);

        if (build) {
            res.json(build);
        } else {
            res.status(404).json({ message: "Build not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch build",
        });
    }
}
