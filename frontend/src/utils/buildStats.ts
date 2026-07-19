import type { Build } from "../types/build";

type DashboardStats = {
  successfulBuilds: number;
  failedBuilds: number;
  runningBuilds: number;
  averageBuildTime: string;
};

function parseDuration(duration: string): number {
  // Ignore running builds
  if (duration.toLowerCase() === "running") {
    return 0;
  }

  const match = duration.match(/(\d+)m\s*(\d+)s/);

  if (!match) {
    return 0;
  }

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);

  return minutes * 60 + seconds;
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

export function calculateBuildStats(builds: Build[]): DashboardStats {
  const successfulBuilds = builds.filter(
    (build) => build.status === "Success"
  ).length;

  const failedBuilds = builds.filter(
    (build) => build.status === "Failed"
  ).length;

  const runningBuilds = builds.filter(
    (build) => build.status === "Running"
  ).length;

  const completedBuilds = builds.filter(
    (build) => build.status !== "Running"
  );

  const totalSeconds = completedBuilds.reduce(
    (sum, build) => sum + parseDuration(build.duration),
    0
  );

  const averageSeconds =
    completedBuilds.length > 0
      ? Math.round(totalSeconds / completedBuilds.length)
      : 0;

  return {
    successfulBuilds,
    failedBuilds,
    runningBuilds,
    averageBuildTime: formatDuration(averageSeconds),
  };
}