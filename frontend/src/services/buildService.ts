import api from "../lib/api";
import type { Build } from "../types/build";

export const getBuilds = async (
  owner: string,
  repo: string
): Promise<Build[]> => {
  const response = await api.get(
    `/repositories/${owner}/${repo}/builds`
  );

  return response.data;
};

export const getBuildById = async (
  owner: string,
  repo: string,
  runId: number
): Promise<Build | null> => {
  try {
    const response = await api.get(
      `/repositories/${owner}/${repo}/builds/${runId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};