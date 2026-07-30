import { builds } from "../data/builds.js";
import {
  getWorkflowRuns,
  getWorkflowRun,
} from "../intergrations/github/github.service.js";
import { mapWorkflowRunToBuild } from "../intergrations/github/github.mapper.js";

export const getBuilds = async (owner: string, repo: string) => {
  const data = await getWorkflowRuns(owner, repo);

  return data.workflow_runs.map(mapWorkflowRunToBuild);
};

export const getBuildbyId = async (
  owner: string,
  repo: string,
  runId: number,
) => {
  const data = await getWorkflowRun(owner, repo, runId);

  return mapWorkflowRunToBuild(data);
};
