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



