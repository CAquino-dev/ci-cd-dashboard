import api from "../lib/api";
import type { Build } from "../types/build";

export const getBuilds = async (): Promise<Build[]> => {
    const response = await api.get("/builds");
    console.log(response.data);
    return response.data;
}