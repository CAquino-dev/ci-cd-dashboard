import {
  CheckCircle2,
  Clock3,
  Timer,
  XCircle,
} from "lucide-react";

import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import BuildTable from "../components/BuildTable";
import type { Build } from "../types/build";
import { getBuilds } from "../services/buildService";


const Dashboard = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);

        const data = await getBuilds();
        setBuilds(data);
      } 
      catch (error) {
        console.error("Error fetching builds:", error);
        setError("Failed to fetch builds.");
      }
      finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  useEffect( () => {
    console.log("Builds state updated:", builds);
  }, [])


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

        <BuildTable builds={builds} />
      </main>
    </>
  );
};

export default Dashboard;