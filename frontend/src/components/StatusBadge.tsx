type Status = "success" | "failed" | "running";

type StatusBadgeProps = {
  status: Status;
};

const styles = {
  success:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",

  failed:
    "bg-red-500/15 text-red-400 border border-red-500/20",

  running:
    "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
};

const labels = {
  success: "Success",
  failed: "Failed",
  running: "Running",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default StatusBadge;