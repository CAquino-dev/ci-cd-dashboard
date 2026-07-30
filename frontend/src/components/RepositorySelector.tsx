import type { Repository } from "@/types/repository";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FolderGit2 } from "lucide-react";

type RepositorySelectorProps = {
  repositories: Repository[];
  selectedRepository: Repository | null;
  onRepositoryChange: (repository: Repository) => void;
};

const RepositorySelector = ({
  repositories,
  selectedRepository,
  onRepositoryChange,
}: RepositorySelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
        <FolderGit2 className="h-4 w-4 text-sky-400" />
        Repository
      </label>

      <Select
        value={selectedRepository?.id.toString()}
        onValueChange={(value) => {
          const repository = repositories.find(
            (repo) => repo.id.toString() === value
          );

          if (repository) {
            onRepositoryChange(repository);
          }
        }}
      >
        <SelectTrigger className="w-[320px] border-slate-700 bg-slate-900 text-slate-100">
          <SelectValue placeholder="Select a repository" />
        </SelectTrigger>

        <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
          {repositories.map((repository) => (
            <SelectItem
              key={repository.id}
              value={repository.id.toString()}
            >
              <div className="flex flex-col">
                <span>{repository.name}</span>
                <span className="text-xs text-slate-400">
                  {repository.owner}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RepositorySelector;