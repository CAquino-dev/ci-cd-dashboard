export type BuildStatus = "success" | "failed" | "running";

export type BuildProvider = "GitHub" | "GitLab" | "Jenkins";

export type Build = {
  id: number;

  provider: "GitHub" | "GitLab" | "Jenkins";

  workflow: string;

  branch: string;

  status: "Success" | "Failed" | "Running";

  duration: string;

  triggeredBy: string;

  commitSha: string;

  startedAt: string;

  finishedAt: string;

  logs: string[];
};