import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  GitBranch,
  Search,
  XCircle,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Build } from "@/types/build";

type BuildTableProps = {
  builds: Build[];
};

const BuildTable = ({ builds }: BuildTableProps) => {
  const [search, setSearch] = useState("");

  const [providerFilter, setProviderFilter] = useState<
    Build["provider"] | "All"
  >("All");

  const [statusFilter, setStatusFilter] = useState<
    Build["status"] | "All"
  >("All");

  const filteredBuilds = useMemo(() => {
    return builds.filter((build) => {
      const matchesSearch =
        build.workflow.toLowerCase().includes(search.toLowerCase()) ||
        build.branch.toLowerCase().includes(search.toLowerCase()) ||
        build.triggeredBy.toLowerCase().includes(search.toLowerCase());

      const matchesProvider =
        providerFilter === "All" ||
        build.provider === providerFilter;

      const matchesStatus =
        statusFilter === "All" ||
        build.status === statusFilter;

      return matchesSearch && matchesProvider && matchesStatus;
    });
  }, [builds, search, providerFilter, statusFilter]);

  const getStatusBadge = (status: Build["status"]) => {
    switch (status) {
      case "Success":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20">
            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
            Success
          </Badge>
        );

      case "Failed":
        return (
          <Badge className="bg-red-500/15 text-red-400 hover:bg-red-500/20">
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Failed
          </Badge>
        );

      case "Running":
        return (
          <Badge className="bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/20">
            <Clock3 className="mr-1 h-3.5 w-3.5 animate-pulse" />
            Running
          </Badge>
        );

      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <section className="mt-10 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-100">
          Build History
        </h3>

        <p className="text-sm text-slate-400">  
          Recent CI/CD pipeline executions
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b border-slate-800 p-6 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <Input
            placeholder="Search workflow, branch, or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600"
          />
        </div>

        <div className="flex gap-3">
          <Select
            value={providerFilter}
            onValueChange={(value) =>
              setProviderFilter(value as Build["provider"] | "All")
            }
          >
            <SelectTrigger className="w-44 bg-slate-800 border-slate-700 text-slate-100 focus:ring-slate-600">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>

            <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
              <SelectItem value="All">All Providers</SelectItem>
              <SelectItem value="GitHub">GitHub</SelectItem>
              <SelectItem value="GitLab">GitLab</SelectItem>
              <SelectItem value="Jenkins">Jenkins</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as Build["status"] | "All")
            }
          >
            <SelectTrigger className="w-44 bg-slate-800 border-slate-700 text-slate-100 focus:ring-slate-600">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Running">Running</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-3">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-medium text-slate-100">
            {filteredBuilds.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-100">
            {builds.length}
          </span>{" "}
          builds
        </p>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-transparent">
            <TableHead className="text-slate-300 font-semibold">Provider</TableHead>
            <TableHead className="text-slate-300 font-semibold">Workflow</TableHead>
            <TableHead className="text-slate-300 font-semibold">Branch</TableHead>
            <TableHead className="text-slate-300 font-semibold">Status</TableHead>
            <TableHead className="text-slate-300 font-semibold">Duration</TableHead>
            <TableHead className="text-slate-300 font-semibold">Triggered By</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredBuilds.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-slate-400"
              >
                No builds found.
              </TableCell>
            </TableRow>
          ) : (
            filteredBuilds.map((build) => (
              <TableRow
                key={build.id}
                className="cursor-pointer border-slate-800 transition-colors hover:bg-slate-800/40"
              >
                <TableCell className="font-medium text-slate-200">
                  {build.provider}
                </TableCell>

                <TableCell className="text-slate-300">{build.workflow}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-slate-300">
                    <GitBranch size={14} className="text-slate-400" />
                    {build.branch}
                  </div>
                </TableCell>

                <TableCell>
                  {getStatusBadge(build.status)}
                </TableCell>

                <TableCell className="text-slate-300">{build.duration}</TableCell>

                <TableCell className="text-slate-300">{build.triggeredBy}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default BuildTable;