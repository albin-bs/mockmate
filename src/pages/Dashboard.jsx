import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Code, Flame, Trophy, TrendingUp, Calendar, CheckCircle } from "lucide-react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);

const TIME_RANGES = ["7d", "30d", "90d"];
const ROLES = ["All roles", "Software Engineer", "Product Manager", "Data Analyst"];

const SESSIONS_PER_DAY = {
  "7d": [2, 3, 1, 4, 3, 2, 5],
  "30d": [1, 2, 0, 3, 2, 4, 1, 3, 2, 0, 4, 3, 5, 1, 2, 3, 1, 4, 2, 3, 1, 0, 2, 3, 2, 4, 1, 3, 2, 5],
  "90d": Array(90).fill(0).map(() => Math.floor(Math.random() * 6)),
};

const SKILL_RADAR = {
  labels: ["Communication", "Problem solving", "System design", "Behavioral", "Coding"],
  data: [70, 65, 55, 72, 68],
};

export default function Dashboard() {
  const [range, setRange] = useState("7d");
  const [role, setRole] = useState("All roles");

  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    plan: "Pro",
    joinedDate: "2025-01-15",
  });

  // Progress data
  const [progress, setProgress] = useState({
    easy: { solved: 12, total: 50 },
    medium: { solved: 8, total: 100 },
    hard: { solved: 3, total: 80 },
  });

  // Recent submissions
  const [recentSubmissions, setRecentSubmissions] = useState([
    {
      id: 1,
      problem: "Two Sum",
      difficulty: "Easy",
      status: "Accepted",
      timestamp: "2025-12-03T18:30:00",
      language: "Python",
    },
    {
      id: 2,
      problem: "Valid Parentheses",
      difficulty: "Easy",
      status: "Wrong Answer",
      timestamp: "2025-12-03T16:45:00",
      language: "JavaScript",
    },
    {
      id: 3,
      problem: "Merge Intervals",
      difficulty: "Medium",
      status: "Accepted",
      timestamp: "2025-12-02T14:20:00",
      language: "Python",
    },
  ]);

  // Streak counter
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    calculateStreak();
  }, []);

  function calculateStreak() {
    const savedStreak = localStorage.getItem("mockmate-streak");
    const savedLastActive = localStorage.getItem("mockmate-last-active");
    const today = new Date().toDateString();

    if (!savedLastActive) {
      setStreak(1);
      localStorage.setItem("mockmate-streak", "1");
      localStorage.setItem("mockmate-last-active", today);
      return;
    }

    const lastDate = new Date(savedLastActive);
    const currentDate = new Date();
    const diffInDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      setStreak(Number(savedStreak));
    } else if (diffInDays === 1) {
      const newStreak = Number(savedStreak) + 1;
      setStreak(newStreak);
      localStorage.setItem("mockmate-streak", String(newStreak));
      localStorage.setItem("mockmate-last-active", today);
    } else {
      setStreak(1);
      localStorage.setItem("mockmate-streak", "1");
      localStorage.setItem("mockmate-last-active", today);
    }
  }

  const totalSolved = progress.easy.solved + progress.medium.solved + progress.hard.solved;
  const totalProblems = progress.easy.total + progress.medium.total + progress.hard.total;

  const lineData = {
    labels: SESSIONS_PER_DAY[range].map((_, i) => {
      if (range === "7d") return `Day ${i + 1}`;
      if (range === "30d") return i % 5 === 0 ? `Day ${i + 1}` : "";
      return i % 15 === 0 ? `Day ${i + 1}` : "";
    }),
    datasets: [
      {
        label: "Sessions",
        data: SESSIONS_PER_DAY[range],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const radarData = {
    labels: SKILL_RADAR.labels,
    datasets: [
      {
        label: "Skill Score",
        data: SKILL_RADAR.data,
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10b981",
        borderWidth: 2,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10b981",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 11 } },
        grid: { color: "rgba(51, 65, 85, 0.3)" },
      },
      y: {
        ticks: { color: "#64748b", font: { size: 11 } },
        grid: { color: "rgba(51, 65, 85, 0.3)" },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#64748b",
          backdropColor: "transparent",
          font: { size: 10 },
        },
        grid: { color: "rgba(51, 65, 85, 0.5)" },
        pointLabels: {
          color: "#94a3b8",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl text-slate-100">
              Dashboard
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Track your progress and keep improving your skills
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {TIME_RANGES.map((r) => (
                <option key={r} value={r}>
                  Last {r}
                </option>
              ))}
            </select>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Top Row: Profile + Quick Actions */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="p-6 border lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 border-2 rounded-full border-emerald-500"
              />
              <div>
                <h2 className="text-lg font-semibold text-slate-100">
                  {user.name}
                </h2>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div>
                <p className="text-xs text-slate-400">Current Plan</p>
                <p className="text-sm font-semibold text-emerald-400">
                  {user.plan}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Member Since</p>
                <p className="text-sm font-semibold text-slate-200">
                  {new Date(user.joinedDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2 sm:grid-cols-2">
            <Link
              to="/code-demo"
              className="p-6 transition-all group bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl"
            >
              <Code className="w-8 h-8 mb-3 text-white" />
              <h3 className="mb-1 text-lg font-semibold text-white">
                Start Coding
              </h3>
              <p className="text-sm text-emerald-100">
                Solve problems and improve your skills
              </p>
            </Link>

            <button className="p-6 text-left transition-all group bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl">
              <Trophy className="w-8 h-8 mb-3 text-white" />
              <h3 className="mb-1 text-lg font-semibold text-white">
                Mock Interview
              </h3>
              <p className="text-sm text-indigo-100">
                Practice with AI-powered interviews
              </p>
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="p-6 mb-8 border bg-slate-900 border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">
                Practice Progress
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {totalSolved} / {totalProblems} problems solved
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-lg font-bold text-slate-100">{streak}</span>
              <span className="text-sm text-slate-400">day streak</span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-6">
            {/* Easy */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-emerald-400">Easy</span>
                  <span className="text-xs text-slate-400">
                    {progress.easy.solved} / {progress.easy.total}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  {Math.round((progress.easy.solved / progress.easy.total) * 100)}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 transition-all rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  style={{
                    width: `${(progress.easy.solved / progress.easy.total) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-amber-400">Medium</span>
                  <span className="text-xs text-slate-400">
                    {progress.medium.solved} / {progress.medium.total}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  {Math.round((progress.medium.solved / progress.medium.total) * 100)}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 transition-all rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                  style={{
                    width: `${(progress.medium.solved / progress.medium.total) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Hard */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-rose-400">Hard</span>
                  <span className="text-xs text-slate-400">
                    {progress.hard.solved} / {progress.hard.total}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  {Math.round((progress.hard.solved / progress.hard.total) * 100)}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 transition-all rounded-full bg-gradient-to-r from-rose-500 to-rose-400"
                  style={{
                    width: `${(progress.hard.solved / progress.hard.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] mb-8">
          {/* Sessions over time */}
          <div className="p-6 border rounded-xl border-slate-800 bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">
              Sessions over time
            </h2>
            <div className="h-64">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>

          {/* Skill radar */}
          <div className="p-6 border rounded-xl border-slate-800 bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">
              Skill Analysis
            </h2>
            <div className="flex items-center justify-center h-64">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </section>

        {/* Recent Submissions */}
        <div className="p-6 border bg-slate-900 border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-100">
              Recent Submissions
            </h2>
            <Link
              to="/submissions"
              className="text-sm transition-colors text-emerald-400 hover:text-emerald-300"
            >
              View all →
            </Link>
          </div>

          {recentSubmissions.length === 0 ? (
            <p className="py-8 text-center text-slate-500">
              No submissions yet. Start coding to see your history!
            </p>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 transition-colors border rounded-lg bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        submission.status === "Accepted"
                          ? "bg-emerald-400"
                          : "bg-rose-400"
                      }`}
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100">
                        {submission.problem}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className={`text-xs font-medium ${
                            submission.difficulty === "Easy"
                              ? "text-emerald-400"
                              : submission.difficulty === "Medium"
                              ? "text-amber-400"
                              : "text-rose-400"
                          }`}
                        >
                          {submission.difficulty}
                        </span>
                        <span className="text-xs text-slate-400">
                          {submission.language}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(submission.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      submission.status === "Accepted"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
