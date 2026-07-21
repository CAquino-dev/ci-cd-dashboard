import { builds } from "../data/builds.js";
import { getWorkflowRuns } from "../intergrations/github/github.service.js";
import {  mapWorkflowRunToBuild } from "../intergrations/github/github.mapper.js";

export const getBuilds = async () => {
    const data = await getWorkflowRuns();
    return data.workflow_runs.map(mapWorkflowRunToBuild);

}

export const getBuildbyId = (id: number) => {
    const build = builds.find((build) => build.id === id);
    return build || null;
}