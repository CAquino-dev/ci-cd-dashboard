export type BuildStatus = "success" | "failed" | "running";

export type BuildProvider = "GitHub" | "GitLab" | "Jenkins";

export interface Build {
  id: number;
  provider: BuildProvider;
  workflow: string;
  branch: string;
  status: BuildStatus;
  duration: string;
  triggeredBy: string;
}