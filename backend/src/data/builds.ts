import type { Build } from "../types/build.js";

export const builds: Build[] = [
  {
    id: 1,
    provider: "GitHub",
    workflow: "Deploy Frontend",
    branch: "main",
    status: "success",
    duration: "2m 13s",
    triggeredBy: "Christian",
  },
  {
    id: 2,
    provider: "Jenkins",
    workflow: "Backend Tests",
    branch: "development",
    status: "failed",
    duration: "4m 01s",
    triggeredBy: "Jenkins Bot",
  },
  {
    id: 3,
    provider: "GitLab",
    workflow: "Docker Build",
    branch: "feature/auth",
    status: "running",
    duration: "Running",
    triggeredBy: "GitLab Runner",
  },
];