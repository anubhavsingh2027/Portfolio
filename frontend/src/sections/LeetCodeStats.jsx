import React, { useEffect, useMemo, useState } from "react";
import {
  FaBolt,
  FaChartLine,
  FaCode,
  FaClock,
  FaExternalLinkAlt,
  FaRedo,
  FaTrophy,
} from "react-icons/fa";
import { leetCodeStats } from "../services/api";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const DIFFICULTIES = [
  { key: "easy", label: "Easy", color: "#22c55e", track: "bg-emerald-400" },
  { key: "medium", label: "Medium", color: "#f59e0b", track: "bg-amber-400" },
  { key: "hard", label: "Hard", color: "#f43f5e", track: "bg-rose-400" },
];

const getCount = (items, difficulty) =>
  items?.find((item) => item.difficulty === difficulty.toUpperCase())?.count ||
  0;

const formatSolvedAt = (solvedAt) =>
  new Date(solvedAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function LeetCodeStats() {
  const [ref, isVisible] = useIntersectionObserver();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await leetCodeStats();
      if (response.error) throw new Error(response.message || response.error);
      setStats(response);
    } catch (loadError) {
      setError(loadError.message || "Unable to load stats");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const difficultyTotals = useMemo(() => {
    if (!stats) return {};
    return DIFFICULTIES.reduce((result, difficulty) => {
      result[difficulty.key] = getCount(
        stats.acceptedQuestions,
        difficulty.key,
      );
      return result;
    }, {});
  }, [stats]);

  const maximumSolved = Math.max(...Object.values(difficultyTotals), 1);
  const updatedAt = stats?.lastUpdated
    ? new Date(stats.lastUpdated).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Live snapshot";

  return (
    <section
      ref={ref}
      id="leetcode"
      className="relative overflow-hidden bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-bg px-4 py-20 text-gray-900 sm:px-6 md:px-10"
    >
      <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-neon-cyan/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-neon-purple/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-neon-cyan">
              <FaCode aria-hidden="true" /> Problem solving, live
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              The work behind the work.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              A live view of my LeetCode practice, refreshed directly from my
              public profile.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Updated {updatedAt}
            <button
              type="button"
              onClick={loadStats}
              disabled={isLoading}
              className="rounded-lg border border-dark-tertiary bg-white/60 p-2 text-gray-600 transition hover:border-neon-cyan/50 hover:text-neon-cyan disabled:opacity-40"
              aria-label="Refresh LeetCode stats"
              title="Refresh stats"
            >
              <FaRedo className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 p-6 text-sm text-rose-800 shadow-sm">
            <p className="font-bold">Stats are temporarily unavailable.</p>
            <button
              type="button"
              onClick={loadStats}
              className="mt-4 rounded-lg bg-neon-cyan px-4 py-2 font-bold text-white transition hover:bg-cyan-700"
            >
              Try again
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-5 transition duration-700 lg:grid-cols-[1.05fr_1.4fr] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <div className="relative overflow-hidden rounded-2xl border border-neon-cyan/20 bg-white/75 p-6 shadow-sm sm:p-8">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-neon-cyan/10 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Total solved
                  </p>
                  <p className="mt-3 text-6xl font-black tracking-tight text-neon-cyan sm:text-7xl">
                    {isLoading ? "--" : stats?.totalSolved?.toLocaleString()}
                  </p>
                  <p className="mt-3 text-sm text-gray-600">
                    Across all difficulty levels
                  </p>
                </div>
                <div className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/10 p-4 text-2xl text-neon-cyan">
                  <FaTrophy aria-hidden="true" />
                </div>
              </div>
              <a
                href={`https://leetcode.com/u/${stats?.username || ""}/`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-neon-cyan transition hover:text-cyan-700"
              >
                View profile <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>

            <div className="rounded-2xl border border-dark-tertiary bg-white/65 p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Difficulty breakdown</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Solved questions by level
                  </p>
                </div>
                <FaChartLine
                  className="text-xl text-neon-cyan"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-6">
                {DIFFICULTIES.map((difficulty) => {
                  const count = difficultyTotals[difficulty.key] || 0;
                  const width = `${Math.max((count / maximumSolved) * 100, count ? 8 : 0)}%`;
                  return (
                    <div key={difficulty.key}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-800">
                          {difficulty.label}
                        </span>
                        <span
                          className="font-bold"
                          style={{ color: difficulty.color }}
                        >
                          {isLoading ? "--" : count}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-dark-tertiary">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${difficulty.track}`}
                          style={{ width: isLoading ? "0%" : width }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-dark-tertiary bg-white/65 p-5 shadow-sm">
                <FaBolt className="mb-4 text-amber-300" />
                <p className="text-2xl font-black text-gray-900">
                  {stats?.totalQuestionBeatsPercentage || "--"}%
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                  Beats overall
                </p>
              </div>
              {DIFFICULTIES.map((difficulty) => {
                const beat = stats?.beatsPercentage?.find(
                  (item) => item.difficulty === difficulty.key.toUpperCase(),
                );
                return (
                  <div
                    key={difficulty.key}
                    className="rounded-2xl border border-dark-tertiary bg-white/65 p-5 shadow-sm"
                  >
                    <p
                      className="text-2xl font-black"
                      style={{ color: difficulty.color }}
                    >
                      {beat?.percentage || "--"}%
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      Beats {difficulty.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-dark-tertiary bg-white/65 p-6 shadow-sm sm:p-8 lg:col-span-2">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="flex items-center gap-2 text-lg font-bold">
                    <FaClock className="text-neon-cyan" aria-hidden="true" />
                    Latest solved questions
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    The ten most recent accepted submissions.
                  </p>
                </div>
                <a
                  href={`https://leetcode.com/u/${stats?.username || ""}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-neon-cyan transition hover:text-cyan-700"
                >
                  Open LeetCode <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>

              {isLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: 10 }, (_, index) => (
                    <div
                      key={index}
                      className="h-[4.5rem] animate-pulse rounded-xl bg-dark-tertiary/60"
                    />
                  ))}
                </div>
              ) : stats?.recentSolvedQuestions?.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {stats.recentSolvedQuestions.map((question, index) => (
                    <a
                      key={question.id}
                      href={`https://leetcode.com/problems/${question.titleSlug}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex min-w-0 items-center gap-3 rounded-xl border border-dark-tertiary bg-white/70 p-3 transition hover:border-neon-cyan/50 hover:bg-neon-cyan/5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-xs font-bold text-neon-cyan">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-gray-800 group-hover:text-neon-cyan">
                          {question.title}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          Solved {formatSolvedAt(question.solvedAt)}
                        </span>
                      </span>
                      <FaExternalLinkAlt
                        className="shrink-0 text-xs text-gray-400 transition group-hover:text-neon-cyan"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-dark-tertiary p-5 text-sm text-gray-600">
                  No recent accepted submissions are available right now.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default LeetCodeStats;
