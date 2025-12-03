import { useState, useEffect } from "react";
import { Trophy, Medal, Award, MessageSquare, Users, TrendingUp } from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("leaderboard"); // leaderboard | discord | discussions
  const [timeRange, setTimeRange] = useState("all-time"); // today | week | month | all-time
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Mock leaderboard data (replace with real API call)
  useEffect(() => {
    loadLeaderboard();
  }, [timeRange]);

  function loadLeaderboard() {
    // Mock data - replace with: fetch(`/api/leaderboard?range=${timeRange}`)
    const mockData = [
      {
        rank: 1,
        userId: "user1",
        username: "AlgoMaster",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlgoMaster",
        solved: 245,
        easy: 98,
        medium: 120,
        hard: 27,
        streak: 45,
        badges: ["top-1", "100-day-streak"],
      },
      {
        rank: 2,
        userId: "user2",
        username: "CodeNinja",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeNinja",
        solved: 198,
        easy: 85,
        medium: 95,
        hard: 18,
        streak: 32,
        badges: ["top-10", "50-day-streak"],
      },
      {
        rank: 3,
        userId: "user3",
        username: "ByteWarrior",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteWarrior",
        solved: 167,
        easy: 72,
        medium: 80,
        hard: 15,
        streak: 28,
        badges: ["top-10"],
      },
      {
        rank: 4,
        userId: "user4",
        username: "DevGuru",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevGuru",
        solved: 154,
        easy: 68,
        medium: 74,
        hard: 12,
        streak: 21,
        badges: ["top-100"],
      },
      {
        rank: 5,
        userId: "user5",
        username: "StackOverflow",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=StackOverflow",
        solved: 142,
        easy: 61,
        medium: 69,
        hard: 12,
        streak: 19,
        badges: ["top-100"],
      },
    ];
    setLeaderboardData(mockData);
  }

  function getBadgeIcon(badge) {
    switch (badge) {
      case "top-1":
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case "top-10":
        return <Medal className="w-4 h-4 text-slate-300" />;
      case "top-100":
        return <Award className="w-4 h-4 text-amber-600" />;
      case "100-day-streak":
        return <span className="text-xs">🔥100</span>;
      case "50-day-streak":
        return <span className="text-xs">🔥50</span>;
      default:
        return null;
    }
  }

  function getRankColor(rank) {
    if (rank === 1) return "text-amber-400";
    if (rank === 2) return "text-slate-300";
    if (rank === 3) return "text-amber-600";
    return "text-slate-400";
  }

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-slate-100">
            Community
          </h1>
          <p className="text-slate-400">
            Join thousands of developers improving their coding skills
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
            <Users className="w-6 h-6 mb-2 text-white" />
            <p className="text-2xl font-bold text-white">12.5K</p>
            <p className="text-xs text-blue-100">Active Users</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl">
            <TrendingUp className="w-6 h-6 mb-2 text-white" />
            <p className="text-2xl font-bold text-white">850K</p>
            <p className="text-xs text-emerald-100">Solutions Submitted</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
            <MessageSquare className="w-6 h-6 mb-2 text-white" />
            <p className="text-2xl font-bold text-white">3.2K</p>
            <p className="text-xs text-purple-100">Discord Members</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl">
            <Trophy className="w-6 h-6 mb-2 text-white" />
            <p className="text-2xl font-bold text-white">450</p>
            <p className="text-xs text-amber-100">Active Streaks</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-slate-800">
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === "leaderboard"
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab("discord")}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === "discord"
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Discord Community
          </button>
          <button
            onClick={() => setActiveTab("discussions")}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === "discussions"
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Discussions
          </button>
        </div>

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <>
            {/* Time Range Filter */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-100">
                Top Solvers
              </h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 text-sm border rounded-lg bg-slate-900 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all-time">All Time</option>
              </select>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-hidden border bg-slate-900 border-slate-800 rounded-xl">
              {/* Table Header */}
              <div className="hidden gap-4 px-6 py-3 text-xs font-semibold border-b md:grid md:grid-cols-12 bg-slate-800/50 border-slate-800 text-slate-400">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">User</div>
                <div className="col-span-2">Solved</div>
                <div className="col-span-3">Breakdown</div>
                <div className="col-span-2">Streak</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-800">
                {leaderboardData.map((user) => (
                  <div
                    key={user.userId}
                    className="grid grid-cols-1 gap-2 px-6 py-4 transition-colors md:grid-cols-12 md:gap-4 hover:bg-slate-800/50"
                  >
                    {/* Rank */}
                    <div className="flex items-center md:col-span-1">
                      <span
                        className={`text-xl font-bold ${getRankColor(
                          user.rank
                        )}`}
                      >
                        #{user.rank}
                      </span>
                    </div>

                    {/* User */}
                    <div className="flex items-center gap-3 md:col-span-4">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 border-2 rounded-full border-slate-700"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {user.username}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {user.badges.map((badge, idx) => (
                            <span key={idx}>{getBadgeIcon(badge)}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Solved */}
                    <div className="flex items-center md:col-span-2">
                      <span className="text-2xl font-bold text-slate-100">
                        {user.solved}
                      </span>
                    </div>

                    {/* Breakdown */}
                    <div className="flex items-center gap-3 text-xs md:col-span-3">
                      <div>
                        <span className="font-semibold text-emerald-400">
                          {user.easy}
                        </span>
                        <span className="ml-1 text-slate-500">Easy</span>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-400">
                          {user.medium}
                        </span>
                        <span className="ml-1 text-slate-500">Med</span>
                      </div>
                      <div>
                        <span className="font-semibold text-rose-400">
                          {user.hard}
                        </span>
                        <span className="ml-1 text-slate-500">Hard</span>
                      </div>
                    </div>

                    {/* Streak */}
                    <div className="flex items-center gap-2 md:col-span-2">
                      <span className="text-xl text-orange-400">🔥</span>
                      <span className="text-sm font-semibold text-slate-100">
                        {user.streak} days
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2 text-sm font-medium transition-colors rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100">
                Load More
              </button>
            </div>
          </>
        )}

        {/* Discord Tab */}
        {activeTab === "discord" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: Info */}
            <div className="space-y-6 lg:col-span-1">
              <div className="p-6 border bg-slate-900 border-slate-800 rounded-xl">
                <h3 className="mb-3 text-lg font-semibold text-slate-100">
                  Join Our Discord
                </h3>
                <p className="mb-4 text-sm text-slate-400">
                  Connect with 3,200+ developers, get help with problems, share
                  solutions, and participate in coding challenges.
                </p>
                <a
                  href="https://discord.gg/your-invite-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-sm font-semibold text-white text-center transition-colors"
                >
                  Join Discord Server
                </a>
              </div>

              <div className="p-6 border bg-slate-900 border-slate-800 rounded-xl">
                <h3 className="mb-3 text-lg font-semibold text-slate-100">
                  Community Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>✅ Be respectful and helpful</li>
                  <li>✅ Share knowledge and solutions</li>
                  <li>✅ Ask questions freely</li>
                  <li>❌ No spam or self-promotion</li>
                  <li>❌ No plagiarism</li>
                </ul>
              </div>
            </div>

            {/* Right: Discord Widget */}
            <div className="lg:col-span-2">
              <div className="p-6 border bg-slate-900 border-slate-800 rounded-xl">
                <h3 className="mb-4 text-lg font-semibold text-slate-100">
                  Live Server Activity
                </h3>

                {/* Discord Widget - Centered */}
                <div className="flex justify-center">
                  <iframe
                    src="https://discord.com/widget?id=1444625707060953150&theme=dark"
                    width="350"
                    height="500"
                    allowTransparency="true"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    title="Discord Server Widget"
                    className="rounded-lg"
                  />
                </div>

                <p className="mt-4 text-xs text-center text-slate-500">
                  Widget shows live members and allows instant server joining
                </p>
              </div>

              {/* Discord Server Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 text-center border bg-slate-900 border-slate-800 rounded-xl">
                  <p className="text-2xl font-bold text-slate-100">3.2K</p>
                  <p className="text-xs text-slate-400">Members</p>
                </div>
                <div className="p-4 text-center border bg-slate-900 border-slate-800 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-400">847</p>
                  <p className="text-xs text-slate-400">Online Now</p>
                </div>
                <div className="p-4 text-center border bg-slate-900 border-slate-800 rounded-xl">
                  <p className="text-2xl font-bold text-slate-100">12</p>
                  <p className="text-xs text-slate-400">Channels</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Discussions Tab */}
        {activeTab === "discussions" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-100">
                Problem Discussions
              </h2>
              <button className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-500">
                New Discussion
              </button>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  problem: "Two Sum",
                  title: "Alternative O(n) solution using sorted array",
                  author: "AlgoMaster",
                  replies: 12,
                  likes: 34,
                  timestamp: "2 hours ago",
                },
                {
                  id: 2,
                  problem: "Valid Parentheses",
                  title: "Help: Getting TLE on test case 45",
                  author: "CodeNinja",
                  replies: 8,
                  likes: 15,
                  timestamp: "5 hours ago",
                },
                {
                  id: 3,
                  problem: "Merge Intervals",
                  title: "Python vs Java performance comparison",
                  author: "DevGuru",
                  replies: 23,
                  likes: 56,
                  timestamp: "1 day ago",
                },
              ].map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-6 transition-colors border cursor-pointer bg-slate-900 border-slate-800 rounded-xl hover:border-slate-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <span className="block mb-1 text-xs text-slate-500">
                        {discussion.problem}
                      </span>
                      <h3 className="mb-1 text-base font-semibold text-slate-100">
                        {discussion.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        by {discussion.author} • {discussion.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      ❤️ {discussion.likes} likes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
