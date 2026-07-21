import api from "../lib/api";
import type { Build } from "../types/build";

export const getBuilds = async (): Promise<Build[]> => {
    const response = await api.get("/builds");
    console.log(response.data);
    return response.data;
}

export const getBuildById = async (id: number): Promise<Build | null> => {
    try {
        const response = await api.get(`/builds/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching build with ID ${id}:`, error);
        return null;
    }
}