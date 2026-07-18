import { Activity } from "lucide-react";

type NavbarProps = {
  userName?: string;
};

const Navbar = ({ userName = "Christian" }: NavbarProps) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-sky-500 p-2 text-white">
            <Activity size={20} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-slate-100">
              CI/CD Dashboard
            </h1>

            <p className="text-xs text-slate-400">
              DevOps Monitoring Platform
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-100">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;