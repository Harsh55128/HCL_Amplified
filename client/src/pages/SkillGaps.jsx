import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { getCurrentUserId } from "../config";

function SkillGaps() {
    const { goalId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadSkillGaps = async () => {
            try {
                setLoading(true);
                setError("");

                // Get currently registered/logged-in user
                const userId = getCurrentUserId();

                // If no user is stored, send user to registration
                if (!userId) {
                    navigate("/register", { replace: true });
                    return;
                }

                if (!goalId) {
                    throw new Error("Goal ID is missing.");
                }

                const response = await api.getSkillGaps(
                    userId,
                    goalId
                );

                setData(response);
            } catch (error) {
                console.error(
                    "Skill gap loading error:",
                    error
                );

                setError(
                    error.message ||
                        "Unable to analyze skill gaps"
                );
            } finally {
                setLoading(false);
            }
        };

        loadSkillGaps();
    }, [goalId, navigate]);

    const getPercentage = (value) => {
        return Math.round((value || 0) * 100);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "completed":
                return {
                    badge:
                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                    label: "Completed"
                };

            case "blocked":
                return {
                    badge:
                        "bg-amber-50 text-amber-700 border-amber-200",
                    label: "Blocked"
                };

            default:
                return {
                    badge:
                        "bg-indigo-50 text-indigo-700 border-indigo-200",
                    label: "Needs Learning"
                };
        }
    };

    /* =========================================
       LOADING
    ========================================== */

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />

                    <h2 className="text-lg font-semibold text-slate-800">
                        Analyzing your skills...
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        We're identifying the gaps for this goal.
                    </p>
                </div>
            </div>
        );
    }

    /* =========================================
       ERROR
    ========================================== */

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-2xl border border-red-100 shadow-sm p-8 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500 text-2xl">
                        !
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-slate-900">
                        Unable to analyze skill gaps
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {error}
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() =>
                                navigate(`/goals/${goalId}`)
                            }
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                        >
                            Back to Goal
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* =========================================
       DATA
    ========================================== */

    const skillGaps = data?.skillGaps || [];

    const completedCount = skillGaps.filter(
        (skill) => skill.status === "completed"
    ).length;

    const learningCount = skillGaps.filter(
        (skill) => skill.status === "needs_learning"
    ).length;

    const blockedCount = skillGaps.filter(
        (skill) => skill.status === "blocked"
    ).length;

    const overallProgress =
        skillGaps.length > 0
            ? Math.round(
                  (skillGaps.reduce(
                      (sum, skill) =>
                          sum +
                          Math.min(
                              (skill.currentMastery || 0) /
                                  Math.max(
                                      skill.requiredLevel || 0,
                                      0.01
                                  ),
                              1
                          ),
                      0
                  ) /
                      skillGaps.length) *
                      100
              )
            : 0;

    return (
        <div className="min-h-screen bg-slate-50">

            {/* =========================================
                HEADER
            ========================================== */}

            <header className="border-b border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-5">

                    <button
                        onClick={() =>
                            navigate(`/goals/${goalId}`)
                        }
                        className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
                    >
                        ← Back to Goal
                    </button>

                    <div className="mt-5">
                        <p className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                            Skill Analysis
                        </p>

                        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
                            {data?.goalTitle || "Skill Gap Analysis"}
                        </h1>

                        <p className="mt-2 max-w-2xl text-slate-500">
                            Understand where you currently stand,
                            identify your skill gaps, and focus on
                            the areas that matter most.
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* =========================================
                    OVERVIEW
                ========================================== */}

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                    {/* Overall Progress */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Overall Progress
                        </p>

                        <div className="mt-3 flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-900">
                                {overallProgress}%
                            </span>

                            <span className="pb-1 text-sm text-slate-400">
                                readiness
                            </span>
                        </div>

                        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-600 rounded-full transition-all"
                                style={{
                                    width: `${overallProgress}%`
                                }}
                            />
                        </div>
                    </div>

                    {/* Skills Analyzed */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Skills Analyzed
                        </p>

                        <p className="mt-3 text-3xl font-bold text-slate-900">
                            {skillGaps.length}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Required for this goal
                        </p>
                    </div>

                    {/* Need Learning */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Need Learning
                        </p>

                        <p className="mt-3 text-3xl font-bold text-indigo-600">
                            {learningCount}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Skills to improve
                        </p>
                    </div>

                    {/* Completed */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Completed
                        </p>

                        <p className="mt-3 text-3xl font-bold text-emerald-600">
                            {completedCount}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Skills already achieved
                        </p>
                    </div>

                </section>


                {/* =========================================
                    BLOCKED WARNING
                ========================================== */}

                {blockedCount > 0 && (
                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">

                        <div className="flex gap-4">

                            <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                                ⚠
                            </div>

                            <div>
                                <h3 className="font-semibold text-amber-900">
                                    {blockedCount} skill
                                    {blockedCount > 1
                                        ? "s are"
                                        : " is"}{" "}
                                    currently blocked
                                </h3>

                                <p className="mt-1 text-sm text-amber-800">
                                    Some skills have prerequisites
                                    that need to be developed first.
                                    Your learning path will account
                                    for these dependencies.
                                </p>
                            </div>

                        </div>

                    </div>
                )}


                {/* =========================================
                    SKILL GAPS
                ========================================== */}

                <section className="mt-8">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">

                        <div>
                            <p className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                                Detailed Analysis
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                Your Skill Gaps
                            </h2>
                        </div>

                        <p className="text-sm text-slate-500">
                            Skills are ranked by learning priority.
                        </p>

                    </div>


                    {skillGaps.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">
                                ✓
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                No skill gaps found
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                You're currently meeting the required
                                skill levels for this goal.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/goals/${goalId}/learning-path`
                                    )
                                }
                                className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                            >
                                View Learning Path →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">

                            {skillGaps.map((skill, index) => {

                                const status =
                                    getStatusStyles(
                                        skill.status
                                    );

                                const current =
                                    getPercentage(
                                        skill.currentMastery
                                    );

                                const required =
                                    getPercentage(
                                        skill.requiredLevel
                                    );

                                const gap =
                                    getPercentage(
                                        skill.gap
                                    );

                                return (
                                    <div
                                        key={
                                            skill.skillId ||
                                            skill._id ||
                                            index
                                        }
                                        className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                                    >

                                        <div className="p-6">

                                            {/* Top */}

                                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                                                <div className="flex gap-4">

                                                    <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </div>

                                                    <div>

                                                        <div className="flex flex-wrap items-center gap-2">

                                                            <h3 className="text-lg font-bold text-slate-900">
                                                                {skill.skillName ||
                                                                    "Unknown Skill"}
                                                            </h3>

                                                            <span
                                                                className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${status.badge}`}
                                                            >
                                                                {status.label}
                                                            </span>

                                                        </div>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Priority score:{" "}
                                                            <span className="font-semibold text-slate-700">
                                                                {typeof skill.priorityScore ===
                                                                "number"
                                                                    ? skill.priorityScore.toFixed(
                                                                          2
                                                                      )
                                                                    : "—"}
                                                            </span>
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Importance + Gap */}

                                                <div className="flex gap-6">

                                                    <div>
                                                        <p className="text-xs text-slate-400">
                                                            Importance
                                                        </p>

                                                        <p className="mt-1 font-bold text-slate-800">
                                                            {getPercentage(
                                                                skill.importance
                                                            )}
                                                            %
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-slate-400">
                                                            Gap
                                                        </p>

                                                        <p className="mt-1 font-bold text-indigo-600">
                                                            {gap}%
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>


                                            {/* Progress */}

                                            <div className="mt-6">

                                                <div className="flex justify-between text-sm mb-2">

                                                    <span className="font-medium text-slate-600">
                                                        Current mastery
                                                    </span>

                                                    <span className="text-slate-500">
                                                        {current}% / {required}%
                                                    </span>

                                                </div>

                                                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">

                                                    <div
                                                        className={`h-full rounded-full ${
                                                            skill.status ===
                                                            "completed"
                                                                ? "bg-emerald-500"
                                                                : skill.status ===
                                                                  "blocked"
                                                                ? "bg-amber-400"
                                                                : "bg-indigo-600"
                                                        }`}
                                                        style={{
                                                            width: `${Math.min(
                                                                current,
                                                                100
                                                            )}%`
                                                        }}
                                                    />

                                                </div>

                                                <div className="mt-2 flex justify-between text-xs text-slate-400">
                                                    <span>
                                                        Current: {current}%
                                                    </span>

                                                    <span>
                                                        Required: {required}%
                                                    </span>
                                                </div>

                                            </div>


                                            {/* Prerequisites */}

                                            {skill.prerequisites?.length > 0 && (
                                                <div className="mt-6 pt-5 border-t border-slate-100">

                                                    <div className="flex items-center justify-between mb-3">

                                                        <h4 className="text-sm font-semibold text-slate-800">
                                                            Prerequisites
                                                        </h4>

                                                        <span className="text-xs text-slate-400">
                                                            {
                                                                skill
                                                                    .prerequisites
                                                                    .length
                                                            }{" "}
                                                            required
                                                        </span>

                                                    </div>

                                                    <div className="flex flex-wrap gap-2">

                                                        {skill.prerequisites.map(
                                                            (
                                                                prerequisite,
                                                                prerequisiteIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        prerequisite.skillId ||
                                                                        prerequisite._id ||
                                                                        prerequisiteIndex
                                                                    }
                                                                    className={`px-3 py-2 rounded-xl border text-xs ${
                                                                        prerequisite.satisfied
                                                                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                                                            : "bg-amber-50 border-amber-200 text-amber-700"
                                                                    }`}
                                                                >

                                                                    <span className="font-semibold">
                                                                        {
                                                                            prerequisite.skillName
                                                                        }
                                                                    </span>

                                                                    <span className="ml-2">
                                                                        {prerequisite.satisfied
                                                                            ? "✓"
                                                                            : `${getPercentage(
                                                                                  prerequisite.gap
                                                                              )}% gap`}
                                                                    </span>

                                                                </div>
                                                            )
                                                        )}

                                                    </div>

                                                </div>
                                            )}

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                </section>


                {/* =========================================
                    CTA
                ========================================== */}

                {skillGaps.length > 0 && (
                    <section className="mt-10">

                        <div className="rounded-3xl bg-slate-900 p-8 md:p-10 text-white overflow-hidden relative">

                            <div className="relative z-10 max-w-2xl">

                                <p className="text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase">
                                    Next Step
                                </p>

                                <h2 className="mt-3 text-2xl md:text-3xl font-bold">
                                    Ready to build your learning path?
                                </h2>

                                <p className="mt-3 text-slate-300 leading-relaxed">
                                    We've analyzed your current mastery,
                                    skill gaps, priorities, and
                                    prerequisites. Now let's turn that
                                    analysis into a structured learning
                                    sequence.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/goals/${goalId}/learning-path`
                                        )
                                    }
                                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold transition shadow-lg"
                                >
                                    Generate Learning Path

                                    <span>→</span>
                                </button>

                            </div>

                            <div className="absolute -right-20 -bottom-32 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

                        </div>

                    </section>
                )}

            </main>
        </div>
    );
}

export default SkillGaps;