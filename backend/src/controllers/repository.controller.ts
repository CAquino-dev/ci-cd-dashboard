import { Request, Response } from "express";
import { getRepositories } from "../services/repository.service.js";

export const getAllRepositories = async (
    req: Request,
    res: Response
) => {
    try {
        const repositories = await getRepositories();
        res.json(repositories);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch repositories",
        });
    }
};