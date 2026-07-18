import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-sky-400",
}: StatCardProps) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition-all duration-200 hover:border-slate-700 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>

        <Icon className={iconColor} size={22} />
      </div>

      <p className="mt-4 text-3xl font-bold text-slate-100">{value}</p>
    </div>
  );
};

export default StatCard;