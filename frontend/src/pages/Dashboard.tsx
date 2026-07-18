import {
  CheckCircle2,
  Clock3,
  Timer,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import BuildTable, { type Build } from "../components/BuildTable";

const mockBuilds: Build[] = [
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

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl bg-slate-950 p-6">
        <h2 className="text-3xl font-semibold text-slate-100">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Welcome to your CI/CD monitoring dashboard.
        </p>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Successful Builds"
            value={128}
            icon={CheckCircle2}
            iconColor="text-emerald-400"
          />

          <StatCard
            title="Failed Builds"
            value={6}
            icon={XCircle}
            iconColor="text-red-400"
          />

          <StatCard
            title="Running Builds"
            value={3}
            icon={Clock3}
            iconColor="text-yellow-400"
          />

          <StatCard
            title="Average Build Time"
            value="2m 18s"
            icon={Timer}
            iconColor="text-sky-400"
          />
        </section>

        <BuildTable builds={mockBuilds} />
      </main>
    </>
  );
};

export default Dashboard;