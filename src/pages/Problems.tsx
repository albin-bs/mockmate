import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, CheckCircle, Circle, Lock } from "lucide-react";
import { problems, allTags, type Difficulty } from "../data/problems";

type StatusFilter = "All" | "Solved" | "Attempted" | "Todo";

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [attemptedProblems, setAttemptedProblems] = useState<Set<string>>(new Set());

  // Load user progress from localStorage
  useEffect(() => {
    loadProgress();
  }, []);

  function loadProgress() {
    const solved = new Set<string>();
    const attempted = new Set<string>();

    problems.forEach((problem) => {
      const history = localStorage.getItem(`mockmate-history-${problem.id}`);
      if (history) {
        try {
          const runs = JSON.parse(history);
          attempted.add(problem.id);

          const hasAccepted = runs.some((run: any) =>
            run.status?.toLowerCase().includes("accepted")
          );
          if (hasAccepted) {
            solved.add(problem.id);
          }
        } catch (e) {
          console.error(`Failed to parse history for ${problem.id}`, e);
        }
      }
    });

    setSolvedProblems(solved);
    setAttemptedProblems(attempted);
  }

  // Filter problems
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.number.toString().includes(searchQuery);

    const matchesDifficulty =
      selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;

    const matchesTag =
      selectedTag === "All" || problem.tags.includes(selectedTag);

    let matchesStatus = true;
    if (selectedStatus === "Solved") {
      matchesStatus = solvedProblems.has(problem.id);
    } else if (selectedStatus === "Attempted") {
      matchesStatus =
        attemptedProblems.has(problem.id) && !solvedProblems.has(problem.id);
    } else if (selectedStatus === "Todo") {
      matchesStatus = !attemptedProblems.has(problem.id);
    }

    return matchesSearch && matchesDifficulty && matchesTag && matchesStatus;
  });

  // Stats
  const stats = {
    total: problems.filter((p) => !p.locked).length,
    solved: solvedProblems.size,
    easy: problems.filter((p) => p.difficulty === "Easy" && solvedProblems.has(p.id)).length,
    medium: problems.filter((p) => p.difficulty === "Medium" && solvedProblems.has(p.id)).length,
    hard: problems.filter((p) => p.difficulty === "Hard" && solvedProblems.has(p.id)).length,
  };

  function getStatusIcon(problemId: string, locked: boolean) {
    if (locked) return <Lock className="w-4 h-4 text-amber-500" />;
    if (solvedProblems.has(problemId))
      return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    if (attemptedProblems.has(problemId))
      return <Circle className="w-4 h-4 text-amber-400" />;
    return <Circle className="w-4 h-4 text-slate-600" />;
  }

  function getDifficultyColor(difficulty: Difficulty) {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-400";
      case "Medium":
        return "text-amber-400";
      case "Hard":
        return "text-rose-400";
    }
  }

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-slate-100">
            Problem Set
          </h1>
          <p className="text-slate-400">
            Solve problems and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-5">
          <div className="p-4 border bg-slate-900 border-slate-800 rounded-xl">
            <p className="mb-1 text-xs text-slate-400">Solved</p>
            <p className="text-2xl font-bold text-slate-100">
              {stats.solved}
              <span className="text-sm font-normal text-slate-400">
                /{stats.total}
              </span>
            </p>
          </div>
          <div className="p-4 border bg-slate-900 border-slate-800 rounded-xl">
            <p className="mb-1 text-xs text-emerald-400">Easy</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.easy}</p>
          </div>
          <div className="p-4 border bg-slate-900 border-slate-800 rounded-xl">
            <p className="mb-1 text-xs text-amber-400">Medium</p>
            <p className="text-2xl font-bold text-amber-400">{stats.medium}</p>
          </div>
          <div className="p-4 border bg-slate-900 border-slate-800 rounded-xl">
            <p className="mb-1 text-xs text-rose-400">Hard</p>
            <p className="text-2xl font-bold text-rose-400">{stats.hard}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
            <p className="mb-1 text-xs text-blue-100">Completion</p>
            <p className="text-2xl font-bold text-white">
              {stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 mb-6 border bg-slate-900 border-slate-800 rounded-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | "All")}
              className="px-4 py-2 text-sm border rounded-lg bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Tag filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as StatusFilter)}
              className="px-4 py-2 text-sm border rounded-lg bg-slate-800 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Status</option>
              <option value="Solved">Solved</option>
              <option value="Attempted">Attempted</option>
              <option value="Todo">Todo</option>
            </select>
          </div>

          {/* Active filters display */}
          {(searchQuery || selectedDifficulty !== "All" || selectedTag !== "All" || selectedStatus !== "All") && (
            <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedDifficulty !== "All" && (
                <span className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300">
                  {selectedDifficulty}
                </span>
              )}
              {selectedTag !== "All" && (
                <span className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300">
                  {selectedTag}
                </span>
              )}
              {selectedStatus !== "All" && (
                <span className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300">
                  {selectedStatus}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDifficulty("All");
                  setSelectedTag("All");
                  setSelectedStatus("All");
                }}
                className="px-2 py-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Problems Table */}
        <div className="overflow-hidden border bg-slate-900 border-slate-800 rounded-xl">
          {/* Table Header */}
          <div className="hidden gap-4 px-6 py-3 text-xs font-semibold border-b md:grid md:grid-cols-12 bg-slate-800/50 border-slate-800 text-slate-400">
            <div className="col-span-1">Status</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-3">Tags</div>
            <div className="col-span-2">Acceptance</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-800">
            {filteredProblems.length === 0 ? (
              <div className="px-6 py-12 text-center text-slate-500">
                No problems found matching your filters.
              </div>
            ) : (
              filteredProblems.map((problem) => (
                <Link
                  key={problem.id}
                  to={problem.locked ? "#" : `/code-demo?problem=${problem.id}`}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-slate-800/50 transition-colors ${
                    problem.locked ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => problem.locked && e.preventDefault()}
                >
                  {/* Status + Title */}
                  <div className="flex items-start gap-3 md:col-span-5">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(problem.id, problem.locked)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-500">
                          #{problem.number}
                        </span>
                        {problem.locked && (
                          <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-medium transition-colors text-slate-100 hover:text-emerald-400">
                        {problem.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-1 md:hidden">
                        {problem.description}
                      </p>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center md:col-span-2">
                    <span
                      className={`text-xs md:text-sm font-medium ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 md:col-span-3">
                    {problem.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] md:text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {problem.tags.length > 2 && (
                      <span className="px-2 py-0.5 text-slate-500 text-[10px] md:text-xs">
                        +{problem.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Acceptance */}
                  <div className="flex items-center md:col-span-2">
                    <span className="text-xs md:text-sm text-slate-400">
                      {problem.acceptance}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-center text-slate-500">
          Showing {filteredProblems.length} of {problems.length} problems
        </div>
      </div>
    </main>
  );
}
