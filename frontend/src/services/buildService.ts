import api from "../lib/api";
import type { Build } from "../types/build";

export const getBuilds = async (): Promise<Build[]> => {
  const response = await api.get("/builds");
  return response.data;
};

export const getBuildById = async (id: number): Promise<Build> => {
  const response = await api.get(`/builds/${id}`);
  return response.data;
};