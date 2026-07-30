import api from "../lib/api";
import type { Repository } from "../types/repository";

export const getRepositories = async (): Promise<Repository[]> => {
    const response = await api.get("/repositories");
    return response.data;
}