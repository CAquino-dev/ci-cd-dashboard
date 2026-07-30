import { Request, Response } from "express";
import { getBuilds, getBuildbyId } from "../services/build.service.js";

type RepositoryParams = {
  owner: string;
  repo: string;
};

type BuildParams = {
  owner: string;
  repo: string;
  runId: string;
};

export const getAllBuilds = async (
  req: Request<RepositoryParams>,
  res: Response
) => {
  const { owner, repo } = req.params;

  try {
    const builds = await getBuilds(owner, repo);
    res.json(builds);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch GitHub workflow runs",
    });
  }
};

export const getBuildById = async (
  req: Request<BuildParams>,
  res: Response
) => {
  const { owner, repo, runId } = req.params;

  try {
    const build = await getBuildbyId(
      owner,
      repo,
      Number(runId)
    );

    if (!build) {
      return res.status(404).json({
        message: "Build not found",
      });
    }

    res.json(build);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch build",
    });
  }
};