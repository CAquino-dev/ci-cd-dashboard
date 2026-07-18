import StatusBadge from "./StatusBadge";
import type { BuildTableProps } from "../types/build";

const BuildTable = ({ builds }: BuildTableProps) => {
  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Recent Builds
        </h2>

        <button className="text-sm font-medium text-sky-400 transition hover:text-sky-300">
          View All
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-slate-950">
          <tr className="text-left text-sm text-slate-400">
            <th className="px-6 py-4">Provider</th>
            <th className="px-6 py-4">Workflow</th>
            <th className="px-6 py-4">Branch</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Duration</th>
            <th className="px-6 py-4">Triggered By</th>
          </tr>
        </thead>

        <tbody>
          {builds.map((build) => (
            <tr
              key={build.id}
              className="border-t border-slate-800 transition hover:bg-slate-800/40"
            >
              <td className="px-6 py-4 text-slate-200">
                {build.provider}
              </td>

              <td className="px-6 py-4 text-slate-200">
                {build.workflow}
              </td>

              <td className="px-6 py-4">
                <code className="rounded bg-slate-800 px-2 py-1 text-sm text-sky-300">
                  {build.branch}
                </code>
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={build.status} />
              </td>

              <td className="px-6 py-4 text-slate-300">
                {build.duration}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {build.triggeredBy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildTable;