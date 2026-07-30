import type { Build } from "../../types/build.js";

export const mapWorkflowRunToBuild = (run: any): Build => {
  const started = new Date(run.run_started_at);
  const finished = run.updated_at
    ? new Date(run.updated_at)
    : new Date();

  const durationMs = finished.getTime() - started.getTime();

  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);

  let status: Build["status"];

  if (run.status === "completed") {
    status = run.conclusion === "success"
      ? "Success"
      : "Failed";
  } else {
    status = "Running";
  }

  return {
    id: run.id,
    provider: "GitHub",
    workflow: run.name,
    branch: run.head_branch,
    status,
    duration: `${minutes}m ${seconds}s`,
    triggeredBy: run.actor.login,
    commitSha: run.head_sha.slice(0, 7),
    startedAt: run.run_started_at,
    finishedAt: run.updated_at ?? "Running",
    logs: [],
  };
};

export const mapRepository = (repo: any) => ({
  id: repo.id,
  owner: repo.owner.login,
  name: repo.name,
  fullName: repo.full_name,
  private: repo.private,
  defaultBranch: repo.default_branch,
  provider: "GitHub",
});