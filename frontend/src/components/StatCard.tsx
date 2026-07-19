import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-slate-400",
  subtitle,
}: StatCardProps) => {
  return (
    <Card
      className="
        border-slate-800
        bg-slate-900
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-slate-700
      "
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>

        <Icon
          className={iconColor}
          size={22}
        />
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold text-slate-100">
          {value}
        </div>

        {subtitle && (
          <p className="mt-2 text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;