import axios from "axios";

export const getWorkflowRuns = async (
  owner: string,
  repo: string
) => {
  const response = await github.get(
    `/repos/${owner}/${repo}/actions/runs`
  );

  return response.data;
};

export const getWorkflowRun = async (
  owner: string,
  repo: string,
  runId: number
) => {
  const response = await github.get(
    `/repos/${owner}/${repo}/actions/runs/${runId}`
  );

  return response.data;
};

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});


export const getUserRepositories = async () => {
  const response = await github.get("/user/repos", {
    params:{
      sort: "updated",
      per_page: 100,
    },
  });

  return response.data;
};



