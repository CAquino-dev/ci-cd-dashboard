import { getUserRepositories } from "../intergrations/github/github.service.js";
import { mapRepository } from "../intergrations/github/github.mapper.js";

export const getRepositories = async () => {
    const repositories = await getUserRepositories();

    return repositories.map(mapRepository);
};

