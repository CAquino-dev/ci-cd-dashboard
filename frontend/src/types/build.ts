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

export type BuildTableProps = {
  builds: Build[];
};