import { builds } from "../data/builds.js";
import { getWorkflowRuns, getWorkflowRun } from "../intergrations/github/github.service.js";
import {  mapWorkflowRunToBuild } from "../intergrations/github/github.mapper.js";

export const getBuilds = async () => {
    const data = await getWorkflowRuns();
    return data.workflow_runs.map(mapWorkflowRunToBuild);
}

export const getBuildbyId = async (id: number) => {
    const data = await getWorkflowRun(id);

    return mapWorkflowRunToBuild(data);
}