import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { problems } from "../data/problems";
import { MessageSquare, ThumbsUp, Clock, ArrowLeft } from "lucide-react";

export default function ProblemDiscussion() {
  const { problemId } = useParams();
  const currentProblem = problems.find((p) => p.id === problemId) || problems[0];

  const [sortBy, setSortBy] = useState("recent"); // recent | popular | answered

  // Mock discussion data (replace with API call later)
  const discussions = [
    {
      id: 1,
      title: "Alternative O(n) solution using hash map",
      author: "AlgoMaster",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlgoMaster",
      replies: 12,
      likes: 34,
      views: 240,
      timestamp: "2 hours ago",
      tags: ["solution", "optimization"],
      solved: true,
    },
    {
      id: 2,
      title: "Getting TLE on test case 45 - Need help",
      author: "CodeNinja",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeNinja",
      replies: 8,
      likes: 15,
      views: 180,
      timestamp: "5 hours ago",
      tags: ["help", "tle"],
      solved: false,
    },
    {
      id: 3,
      title: "Python vs JavaScript performance comparison",
      author: "DevGuru",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevGuru",
      replies: 23,
      likes: 56,
      views: 420,
      timestamp: "1 day ago",
      tags: ["discussion", "performance"],
      solved: true,
    },
    {
      id: 4,
      title: "Can someone explain the two-pointer approach?",
      author: "ByteWarrior",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteWarrior",
      replies: 6,
      likes: 11,
      views: 95,
      timestamp: "3 hours ago",
      tags: ["help", "algorithm"],
      solved: false,
    },
  ];

  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400";
      case "Medium":
        return "bg-amber-500/10 text-amber-400";
      case "Hard":
        return "bg-rose-500/10 text-rose-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  }

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back to Problem */}
        <Link
          to={`/practice?problem=${problemId}`}
          className="inline-flex items-center gap-2 mb-6 text-sm transition-colors text-slate-400 hover:text-emerald-400"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Problem
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`rounded px-2 py-0.5 text-xs font-medium ${getDifficultyColor(
                currentProblem.difficulty
              )}`}
            >
              {currentProblem.difficulty}
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl text-slate-100">
              {currentProblem.number}. {currentProblem.title} - Discussions
            </h1>
          </div>
          <p className="text-slate-400">
            Share solutions, ask questions, and learn from the community
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy("recent")}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                sortBy === "recent"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                sortBy === "popular"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setSortBy("answered")}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                sortBy === "answered"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Answered
            </button>
          </div>

          <button className="px-4 py-2 text-sm font-medium text-white transition-colors rounded bg-emerald-600 hover:bg-emerald-500">
            New Discussion
          </button>
        </div>

        {/* Discussion List */}
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="p-6 transition-all border cursor-pointer bg-slate-900/60 border-slate-800 rounded-xl hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Avatar + Content */}
                <div className="flex flex-1 gap-4">
                  <img
                    src={discussion.authorAvatar}
                    alt={discussion.author}
                    className="w-10 h-10 border-2 rounded-full border-slate-700 shrink-0"
                  />

                  <div className="flex-1">
                    {/* Title */}
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-base font-semibold transition-colors text-slate-100 hover:text-emerald-400">
                        {discussion.title}
                      </h3>
                      {discussion.solved && (
                        <span className="shrink-0 rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                          ✓ Solved
                        </span>
                      )}
                    </div>

                    {/* Author + Meta */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-slate-400">
                      <span className="font-medium text-slate-300">
                        {discussion.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {discussion.timestamp}
                      </span>
                      <span>•</span>
                      <span>{discussion.views} views</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {discussion.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-medium">{discussion.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">{discussion.replies}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2 text-sm font-medium transition-colors rounded bg-slate-800 hover:bg-slate-700 text-slate-100">
            Load More Discussions
          </button>
        </div>
      </div>
    </main>
  );
}
