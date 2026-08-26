import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { getCurrentUserId } from "../config";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [goals, setGoals] = useState([]);
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Create goal state
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        target: "",
        deadline: "",
        weeklyHours: ""
    });

    /* =====================================================
       LOAD DASHBOARD
    ===================================================== */

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const userId = getCurrentUserId();

            if (!userId) {
                throw new Error("No current user found");
            }

            const [
                userResponse,
                goalsResponse,
                skillsResponse
            ] = await Promise.all([
                api.getUser(userId),
                api.getGoals(userId),
                api.getSkills(userId)
            ]);

            setUser(userResponse?.user || null);
            setGoals(goalsResponse?.goals || []);
            setSkills(skillsResponse?.skills || []);

        } catch (error) {
            console.error(
                "Dashboard loading error:",
                error
            );

            setError(
                error.message === "No current user found"
                    ? "Please create or select a user first."
                    : "Unable to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    /* =====================================================
       CREATE GOAL FORM
    ===================================================== */

    const openCreateGoalForm = () => {
        setCreateError("");

        setFormData({
            title: "",
            target: "",
            deadline: "",
            weeklyHours: ""
        });

        setShowCreateForm(true);
    };

    const closeCreateGoalForm = () => {
        if (creating) {
            return;
        }

        setShowCreateForm(false);
        setCreateError("");

        setFormData({
            title: "",
            target: "",
            deadline: "",
            weeklyHours: ""
        });
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleCreateGoal = async (event) => {
        event.preventDefault();

        setCreateError("");

        const title = formData.title.trim();
        const target = formData.target.trim();

        if (!title) {
            setCreateError(
                "Please enter a goal title."
            );
            return;
        }

        try {
            setCreating(true);

            const userId = getCurrentUserId();

            if (!userId) {
                throw new Error(
                    "No current user found"
                );
            }

            const payload = {
                title,
                target
            };

            // Only send deadline when user selected one
            if (formData.deadline) {
                payload.deadline = formData.deadline;
            }

            // Only send weeklyHours when entered
            if (
                formData.weeklyHours !== "" &&
                formData.weeklyHours !== null
            ) {
                const weeklyHours = Number(
                    formData.weeklyHours
                );

                if (
                    Number.isNaN(weeklyHours) ||
                    weeklyHours < 0
                ) {
                    setCreateError(
                        "Weekly learning hours must be a valid positive number."
                    );
                    setCreating(false);
                    return;
                }

                payload.weeklyHours = weeklyHours;
            }

            console.log(
                "Creating goal with payload:",
                payload
            );

            const response = await api.createGoal(
                userId,
                payload
            );

            console.log(
                "Create goal response:",
                response
            );

            if (!response?.goal) {
                throw new Error(
                    "Goal was not created. The server returned an invalid response."
                );
            }

            /*
             * Add newly-created goal immediately.
             *
             * This means the dashboard updates without
             * requiring another API request or page refresh.
             */
            setGoals((previous) => [
                response.goal,
                ...previous
            ]);

            // Reset form
            setFormData({
                title: "",
                target: "",
                deadline: "",
                weeklyHours: ""
            });

            setCreateError("");
            setShowCreateForm(false);

        } catch (error) {
            console.error(
                "Create goal error:",
                error
            );

            setCreateError(
                error?.message ||
                "Failed to create learning goal. Please try again."
            );
        } finally {
            setCreating(false);
        }
    };

    /* =====================================================
       STATUS STYLE
    ===================================================== */

    const getStatusStyle = (status) => {
        const normalizedStatus =
            status?.toLowerCase();

        if (
            normalizedStatus === "completed" ||
            normalizedStatus === "complete"
        ) {
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        }

        if (
            normalizedStatus === "in progress" ||
            normalizedStatus === "active"
        ) {
            return "bg-indigo-50 text-indigo-700 border-indigo-200";
        }

        if (
            normalizedStatus === "paused"
        ) {
            return "bg-amber-50 text-amber-700 border-amber-200";
        }

        return "bg-slate-100 text-slate-600 border-slate-200";
    };

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">

                    <div className="h-10 w-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />

                    <p className="text-sm font-medium text-slate-500">
                        Loading dashboard...
                    </p>

                </div>
            </div>
        );
    }

    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

                <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <span className="text-2xl">
                            ⚠️
                        </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Something went wrong
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {error}
                    </p>

                    <button
                        onClick={loadDashboard}
                        className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-8 shadow-xl shadow-indigo-100 sm:px-10 sm:py-10">

                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                    <div className="absolute -bottom-20 right-32 h-56 w-56 rounded-full bg-white/5" />

                    <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">

                        <div>

                            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-indigo-200">
                                LEARNING DASHBOARD
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Welcome back,{" "}
                                {user?.name || "Learner"} 👋
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                                Continue building your personalized
                                learning journey and keep making
                                progress toward your goals.
                            </p>

                        </div>

                        <div className="hidden shrink-0 md:block">

                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur-sm">
                                🎯
                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    STATS
                ===================================================== */}

                <section className="-mt-5 relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Active Goals */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Active Goals
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {
                                        goals.filter(
                                            (goal) =>
                                                goal.status ===
                                                "active"
                                        ).length
                                    }
                                </p>

                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl transition group-hover:scale-110">
                                🎯
                            </div>

                        </div>

                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div
                                className="h-full rounded-full bg-indigo-500"
                                style={{
                                    width:
                                        goals.length > 0
                                            ? `${Math.min(
                                                  (goals.filter(
                                                      (goal) =>
                                                          goal.status ===
                                                          "active"
                                                  ).length /
                                                      goals.length) *
                                                      100,
                                                  100
                                              )}%`
                                            : "0%"
                                }}
                            />

                        </div>

                    </div>


                    {/* Skills */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Skills Tracked
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {skills.length}
                                </p>

                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-xl transition group-hover:scale-110">
                                🧠
                            </div>

                        </div>

                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div className="h-full w-2/3 rounded-full bg-violet-500" />

                        </div>

                    </div>


                    {/* Learning Hours */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Learning Hours
                                </p>

                                <div className="mt-2 flex items-baseline gap-2">

                                    <p className="text-3xl font-bold text-slate-900">
                                        {user?.weeklyHours || 0}
                                    </p>

                                    <span className="text-sm text-slate-400">
                                        hrs / week
                                    </span>

                                </div>

                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl transition group-hover:scale-110">
                                ⏱️
                            </div>

                        </div>

                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div className="h-full w-1/2 rounded-full bg-emerald-500" />

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    GOALS HEADER
                ===================================================== */}

                <section className="mt-10">

                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <p className="text-xs font-bold tracking-[0.2em] text-indigo-600">
                                YOUR GOALS
                            </p>

                            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Current Learning Goals
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Track the skills you need to reach
                                your targets.
                            </p>

                        </div>

                        <div className="flex items-center gap-4">

                            <span className="text-sm font-medium text-slate-400">
                                {goals.length}{" "}
                                {goals.length === 1
                                    ? "goal"
                                    : "goals"}
                            </span>

                            {/* Create button is also available
                                when goals already exist */}

                            <button
                                onClick={openCreateGoalForm}
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
                            >
                                <span className="text-lg leading-none">
                                    +
                                </span>

                                Create Goal
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        CREATE GOAL FORM
                    ================================================= */}

                    {showCreateForm && (
                        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                            <div className="border-b border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                                            New Goal
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold text-slate-900">
                                            Create a Learning Goal
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Tell us what you want to
                                            achieve and we'll build
                                            your learning journey.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={closeCreateGoalForm}
                                        disabled={creating}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        ✕
                                    </button>

                                </div>

                            </div>


                            <form
                                onSubmit={handleCreateGoal}
                                className="p-6 sm:p-8"
                            >

                                {/* API error */}

                                {createError && (
                                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                                        <p className="text-sm font-medium text-red-700">
                                            {createError}
                                        </p>

                                    </div>
                                )}


                                <div className="grid gap-6 lg:grid-cols-2">

                                    {/* Title */}

                                    <div className="lg:col-span-2">

                                        <label
                                            htmlFor="goal-title"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Goal title
                                        </label>

                                        <input
                                            id="goal-title"
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleFormChange}
                                            placeholder="e.g. Become a Full Stack Developer"
                                            disabled={creating}
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                    </div>


                                    {/* Target */}

                                    <div className="lg:col-span-2">

                                        <label
                                            htmlFor="goal-target"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            What do you want to achieve?
                                        </label>

                                        <textarea
                                            id="goal-target"
                                            name="target"
                                            value={formData.target}
                                            onChange={handleFormChange}
                                            rows={4}
                                            disabled={creating}
                                            placeholder="Describe your learning target..."
                                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                    </div>


                                    {/* Deadline */}

                                    <div>

                                        <label
                                            htmlFor="goal-deadline"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Target deadline
                                        </label>

                                        <input
                                            id="goal-deadline"
                                            type="date"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleFormChange}
                                            disabled={creating}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                    </div>


                                    {/* Weekly hours */}

                                    <div>

                                        <label
                                            htmlFor="goal-hours"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Weekly learning hours
                                        </label>

                                        <input
                                            id="goal-hours"
                                            type="number"
                                            name="weeklyHours"
                                            min="0"
                                            step="0.5"
                                            value={formData.weeklyHours}
                                            onChange={handleFormChange}
                                            disabled={creating}
                                            placeholder="e.g. 10"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                    </div>

                                </div>


                                {/* Actions */}

                                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                                    <button
                                        type="button"
                                        onClick={closeCreateGoalForm}
                                        disabled={creating}
                                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={
                                            creating ||
                                            !formData.title.trim()
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {creating ? (
                                            <>
                                                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Goal"
                                        )}
                                    </button>

                                </div>

                            </form>

                        </section>
                    )}


                    {/* =================================================
                        EMPTY STATE
                    ================================================= */}

                    {goals.length === 0 ? (

                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                                🎯
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-900">
                                No learning goals yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Create your first learning goal
                                to start building your personalized
                                learning path.
                            </p>

                            <button
                                onClick={openCreateGoalForm}
                                className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
                            >
                                Create Your First Goal
                            </button>

                        </div>

                    ) : (

                        /* =================================================
                           GOALS LIST
                        ================================================= */

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                            {goals.map((goal) => (

                                <div
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
                                    key={goal._id}
                                >

                                    {/* Goal Header */}

                                    <div className="flex items-start justify-between gap-4">

                                        <div className="min-w-0">

                                            <div className="mb-3 flex items-center gap-2">

                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-lg">
                                                    🚀
                                                </span>

                                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                    Learning Goal
                                                </span>

                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-indigo-600">
                                                {goal.title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                                {goal.target ||
                                                    "Build the skills required to achieve this learning goal."}
                                            </p>

                                        </div>

                                        <span
                                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                                                goal.status
                                            )}`}
                                        >
                                            {goal.status ||
                                                "active"}
                                        </span>

                                    </div>


                                    {/* Divider */}

                                    <div className="my-6 h-px bg-slate-100" />


                                    {/* Skills */}

                                    <div>

                                        <div className="mb-4 flex items-center justify-between">

                                            <h4 className="text-sm font-bold text-slate-800">
                                                Required Skills
                                            </h4>

                                            {goal.requiredSkills?.length > 0 && (
                                                <span className="text-xs text-slate-400">
                                                    {
                                                        goal
                                                            .requiredSkills
                                                            .length
                                                    }{" "}
                                                    skills
                                                </span>
                                            )}

                                        </div>


                                        {goal.requiredSkills?.length > 0 ? (

                                            <div className="space-y-5">

                                                {goal.requiredSkills
                                                    .slice(0, 4)
                                                    .map(
                                                        (
                                                            item,
                                                            index
                                                        ) => {

                                                            const percentage =
                                                                Math.min(
                                                                    Math.round(
                                                                        (item.requiredLevel ||
                                                                            0) *
                                                                            100
                                                                    ),
                                                                    100
                                                                );

                                                            return (
                                                                <div
                                                                    key={
                                                                        item
                                                                            .skillId
                                                                            ?._id ||
                                                                        index
                                                                    }
                                                                >

                                                                    <div className="mb-2 flex items-center justify-between">

                                                                        <span className="text-sm font-medium text-slate-700">
                                                                            {item
                                                                                .skillId
                                                                                ?.name ||
                                                                                "Skill"}
                                                                        </span>

                                                                        <span className="text-xs font-bold text-indigo-600">
                                                                            {
                                                                                percentage
                                                                            }
                                                                            %
                                                                        </span>

                                                                    </div>

                                                                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                                                        <div
                                                                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                                                                            style={{
                                                                                width: `${percentage}%`
                                                                            }}
                                                                        />

                                                                    </div>

                                                                </div>
                                                            );
                                                        }
                                                    )}

                                            </div>

                                        ) : (

                                            <div className="rounded-xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                                                Skills are being
                                                analyzed for this
                                                goal.
                                            </div>

                                        )}

                                    </div>


                                    {/* Footer */}

                                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                                        <span className="text-xs text-slate-400">
                                            Keep learning and
                                            improving 🚀
                                        </span>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/goals/${goal._id}`
                                                )
                                            }
                                            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                                        >
                                            View details →
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Dashboard;