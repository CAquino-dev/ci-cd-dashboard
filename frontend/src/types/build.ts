export type Build = {
  id: number;
  provider: "GitHub" | "GitLab" | "Jenkins";
  workflow: string;
  branch: string;
  status: "success" | "failed" | "running";
  duration: string;
  triggeredBy: string;
};

export type BuildTableProps = {
  builds: Build[];
};