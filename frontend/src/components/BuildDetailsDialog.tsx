import { useEffect, useState } from "react";

import type { Build } from "@/types/build";
import { getBuildById } from "@/services/buildService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  GitBranch,
  User,
  Hash,
  Calendar,
  FileText,
  Copy,
  Download,
  Terminal,
  ExternalLink,
} from "lucide-react";

type BuildDetailsDialogProps = {
  buildId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const BuildDetailsDialog = ({
  buildId,
  open,
  onOpenChange,
}: BuildDetailsDialogProps) => {
if (buildId === null) return null;  

    const [build, setBuild] = useState<Build | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
  if (!open || buildId === null) return;

  const fetchBuild = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBuildById(buildId);
      setBuild(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load build details.");
    } finally {
      setLoading(false);
    }
  };

  fetchBuild();
}, [open, buildId]);

if (loading) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

if (error) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <div className="flex h-48 items-center justify-center text-red-400">
          {error}
        </div>
      </DialogContent>
    </Dialog>
  );
}

if (!build) {
  return null;
}

  const getStatusIcon = (status: Build["status"]) => {
    switch (status) {
      case "Success":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "Running":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Build["status"]) => {
    const variants = {
      Success:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
      Failed:
        "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
      Running:
        "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20",
    };

    return (
      <Badge
        variant="outline"
        className={`${variants[status]} flex items-center gap-1.5 px-3 py-1 text-xs font-medium`}
      >
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800/50 shadow-2xl shadow-slate-900/50 p-0 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-slate-800/50 bg-slate-900 px-6 py-5 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          <DialogHeader className="relative">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-slate-100">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  Build #{build.id}
                </DialogTitle>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {getStatusBadge(build.status)}
                  <span className="text-sm text-slate-400">
                    {build.provider} · {build.workflow}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-track-slate-800/20 scrollbar-thumb-slate-700/50 hover:scrollbar-thumb-slate-600/50">
          {/* Summary Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-slate-800/30 p-4 border border-slate-800/50">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                <Hash className="h-3.5 w-3.5" />
                Provider
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-200">
                {build.provider}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/30 p-4 border border-slate-800/50">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                <GitBranch className="h-3.5 w-3.5" />
                Branch
              </p>
              <p className="mt-1.5 font-mono text-sm text-slate-200">
                {build.branch}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/30 p-4 border border-slate-800/50">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                <User className="h-3.5 w-3.5" />
                Triggered By
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-xs font-medium text-blue-400">
                  {build.triggeredBy.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-200">
                  {build.triggeredBy}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/30 p-4 border border-slate-800/50">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                Duration
              </p>
              <p className="mt-1.5 font-mono text-sm text-slate-200">
                {build.duration}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/30 p-4 border border-slate-800/50">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                <Hash className="h-3.5 w-3.5" />
                Commit SHA
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <code className="flex-1 truncate rounded bg-slate-900/50 px-2 py-1 font-mono text-xs text-slate-300">
                  {build.commitSha}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-slate-400 hover:text-slate-200"
                  onClick={() => copyToClipboard(build.commitSha)}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/30 p-4 border border-slate-800/50">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                <Calendar className="h-3.5 w-3.5" /> Timeline
              </p>
              <div className="mt-1.5 space-y-1 text-sm text-slate-200">
                <p>Started: {build.startedAt}</p>
                <p className="text-xs text-slate-400">
                  Finished: {build.finishedAt}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-slate-800/50" />

          {/* Logs Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-slate-100">
                  Build Logs
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-slate-800 text-slate-400"
                >
                  {build.logs.length} lines
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  onClick={() => copyToClipboard(build.logs.join("\n"))}
                >
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800/50 bg-slate-950/50">
              <div className="space-y-1 p-4 font-mono text-xs max-h-72 overflow-y-auto scrollbar-thin scrollbar-track-slate-900/30 scrollbar-thumb-slate-700/50 hover:scrollbar-thumb-slate-600/50">
                {build.logs.map((log, index) => {
                  const isError =
                    log.toLowerCase().includes("error") ||
                    log.toLowerCase().includes("fail");
                  const isWarning = log.toLowerCase().includes("warn");
                  const isSuccess =
                    log.toLowerCase().includes("success") ||
                    log.toLowerCase().includes("passed");

                  let textColor = "text-slate-400";
                  if (isError) textColor = "text-red-400";
                  else if (isWarning) textColor = "text-yellow-400";
                  else if (isSuccess) textColor = "text-emerald-400";

                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 rounded px-2 py-1 hover:bg-slate-800/30 transition-colors ${textColor}`}
                    >
                      <span className="min-w-[3rem] select-none text-slate-600">
                        {String(index + 1).padStart(4, " ")}
                      </span>
                      <span className="whitespace-pre-wrap break-all">
                        {log}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm px-6 py-4">
          <div className="flex justify-end gap-3">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View in CI/CD
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default BuildDetailsDialog;