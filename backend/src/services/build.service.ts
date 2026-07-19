import { builds } from "../data/builds.js";

export const getBuilds = () => {
    return builds;
}

export const getBuildbyId = (id: number) => {
    const build = builds.find((build) => build.id === id);
    return build || null;
}