import axios from "axios";

export const getWorkflowRuns = async () => {
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  return response.data;
};

export const getWorkflowRun = async (runId: number) => {
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
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



