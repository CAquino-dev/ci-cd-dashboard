import {
  CheckCircle2,
  Clock3,
  Timer,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import BuildTable from "../components/BuildTable";
import RepositorySelector from "../components/RepositorySelector";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import type { Build } from "../types/build";
import type { Repository } from "../types/repository";

import { getBuilds } from "../services/buildService";
import { getRepositories } from "../services/repositoryService";
import { calculateBuildStats } from "../utils/buildStats";

const Dashboard = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);

  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const stats = calculateBuildStats(builds);

  /**
   * Load repositories on page load
   */
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getRepositories();

        setRepositories(data);

        if (data.length > 0) {
          setSelectedRepository(data[0]);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  /**
   * Load builds whenever the selected repository changes
   */
  useEffect(() => {
    if (!selectedRepository) return;

    const fetchBuilds = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBuilds(
          selectedRepository.owner,
          selectedRepository.name
        );

        setBuilds(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch builds.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, [selectedRepository]);

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

        <div className="mt-6">
          <RepositorySelector
            repositories={repositories}
            selectedRepository={selectedRepository}
            onRepositoryChange={setSelectedRepository}
          />
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Successful Builds"
            value={stats.successfulBuilds}
            subtitle="+12 this week"
            icon={CheckCircle2}
            iconColor="text-emerald-400"
          />

          <StatCard
            title="Failed Builds"
            value={stats.failedBuilds}
            subtitle="Needs attention"
            icon={XCircle}
            iconColor="text-red-400"
          />

          <StatCard
            title="Running Builds"
            value={stats.runningBuilds}
            subtitle="Currently executing"
            icon={Clock3}
            iconColor="text-yellow-400"
          />

          <StatCard
            title="Average Build Time"
            value={stats.averageBuildTime}
            subtitle="Last 50 builds"
            icon={Timer}
            iconColor="text-sky-400"
          />
        </section>

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <BuildTable
            builds={builds}
            repository={selectedRepository}
          />
        )}
      </main>
    </>
  );
};

export default Dashboard;