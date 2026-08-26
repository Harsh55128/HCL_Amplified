import { useEffect, useState } from "react";
import { api } from "../services/api";
import { getCurrentUserId } from "../config";
import { useNavigate } from "react-router-dom";

function Goals() {
     const userId = getCurrentUserId();
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        target: "",
        deadline: "",
        weeklyHours: ""
    });

    const [creating, setCreating] = useState(false);

    useEffect(() => {
        loadGoals();
    }, [userId]);

    const loadGoals = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.getGoals(userId);

            setGoals(response.goals || []);
        } catch (error) {
            console.error("Goals loading error:", error);
            setError("Unable to load your learning goals.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleCreateGoal = async (event) => {
        event.preventDefault();

        if (!formData.title.trim()) {
            return;
        }

        try {
            setCreating(true);

            const response = await api.createGoal(
                userId,
                {
                    title: formData.title,
                    target: formData.target,
                    deadline: formData.deadline || undefined,
                    weeklyHours: formData.weeklyHours
                        ? Number(formData.weeklyHours)
                        : undefined
                }
            );

            if (response.goal) {
                setGoals((previous) => [
                    response.goal,
                    ...previous
                ]);
            }

            setFormData({
                title: "",
                target: "",
                deadline: "",
                weeklyHours: ""
            });

            setShowCreateForm(false);

        } catch (error) {
            console.error("Create goal error:", error);

            alert(
                error.message ||
                "Failed to create learning goal."
            );
        } finally {
            setCreating(false);
        }
    };

    const activeGoals = goals.filter(
        (goal) => goal.status === "active"
    );

    const completedGoals = goals.filter(
        (goal) => goal.status === "completed"
    );

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-slate-50 px-6 py-10">
                <div className="mx-auto w-full max-w-7xl animate-pulse">
                    <div className="h-8 w-64 rounded-lg bg-slate-200" />
                    <div className="mt-3 h-4 w-96 rounded bg-slate-200" />

                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-64 rounded-2xl bg-white shadow-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full bg-slate-50 px-6 py-10">
                <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center">
                    <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
                            !
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            Something went wrong
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {error}
                        </p>

                        <button
                            onClick={loadGoals}
                            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        
        <div className="min-h-screen w-full bg-[#f7f8fc] text-slate-900">

            {/* Page container */}
            <main className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 xl:px-12">

                {/* =========================================
                    HEADER
                ========================================== */}

                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-8 text-white shadow-xl shadow-indigo-100 sm:px-10 sm:py-10">

                    {/* Decorative circles */}
                    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
                    <div className="absolute -bottom-32 right-32 h-72 w-72 rounded-full bg-white/5" />

                    <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

                        <div className="max-w-2xl">

                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-100">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
                                Learning Goals
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                My Learning Goals
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                                Define what you want to learn and let the
                                adaptive engine build a personalized
                                learning journey around you.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                setShowCreateForm(true)
                            }
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
                        >
                            <span className="text-lg leading-none">
                                +
                            </span>

                            Create Goal
                        </button>

                    </div>
                </section>


                {/* =========================================
                    QUICK STATS
                ========================================== */}

                <section className="mt-8 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Total Goals
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {goals.length}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                                🎯
                            </div>
                        </div>
                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Active Goals
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {activeGoals.length}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                                🚀
                            </div>
                        </div>
                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Completed
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {completedGoals.length}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                ✓
                            </div>
                        </div>
                    </div>

                </section>


                {/* =========================================
                    CREATE GOAL FORM
                ========================================== */}

                {showCreateForm && (
                    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                                    New Goal
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                    Create a Learning Goal
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Describe what you want to achieve.
                                    The adaptive engine will identify
                                    the required skills.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowCreateForm(false)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            onSubmit={handleCreateGoal}
                            className="mt-8"
                        >

                            <div className="grid gap-6 lg:grid-cols-2">

                                <div className="lg:col-span-2">

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Goal title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Become a Full Stack Developer"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        required
                                    />

                                </div>


                                <div className="lg:col-span-2">

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        What do you want to achieve?
                                    </label>

                                    <textarea
                                        name="target"
                                        value={formData.target}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Describe your learning target..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Target deadline
                                    </label>

                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Weekly learning hours
                                    </label>

                                    <input
                                        type="number"
                                        name="weeklyHours"
                                        min="0"
                                        value={formData.weeklyHours}
                                        onChange={handleChange}
                                        placeholder="e.g. 10"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />

                                </div>

                            </div>


                            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCreateForm(false)
                                    }
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {creating
                                        ? "Creating..."
                                        : "Create Goal"}
                                </button>

                            </div>

                        </form>

                    </section>
                )}


                {/* =========================================
                    GOALS
                ========================================== */}

                <section className="mt-10">

                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                                Your Journey
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Current Learning Goals
                            </h2>
                        </div>

                        <p className="text-sm font-medium text-slate-500">
                            {goals.length}{" "}
                            {goals.length === 1
                                ? "goal"
                                : "goals"}
                        </p>

                    </div>


                    {goals.length === 0 ? (

                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                                🎯
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                No learning goals yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Create your first learning goal and
                                let the adaptive engine build your
                                personalized learning path.
                            </p>

                            <button
                                onClick={() =>
                                    setShowCreateForm(true)
                                }
                                className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                            >
                                Create your first goal
                            </button>

                        </div>

                    ) : (

                        <div className="grid gap-6 lg:grid-cols-2">

                            {goals.map((goal) => (

                                <GoalCard
                                    key={goal._id}
                                    goal={goal}
                                />

                            ))}

                        </div>

                    )}

                </section>

            </main>
        </div>
    );
}


/* =====================================================
   GOAL CARD
===================================================== */

function GoalCard({ goal }) {
    const navigate = useNavigate();

    const skills = goal.requiredSkills || [];

    const visibleSkills = skills.slice(0, 8);

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-7">

            {/* Top accent */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />


            {/* Header */}
            <div className="flex items-start justify-between gap-5">

                <div className="min-w-0">

                    <div className="flex items-center gap-2">

                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                            {goal.requiredSkills?.[0]?.skillId?.domain ||
                                "Learning"}
                        </span>

                    </div>

                    <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        {goal.title}
                    </h3>

                </div>


                <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                        goal.status === "completed"
                            ? "bg-blue-50 text-blue-600"
                            : goal.status === "paused"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                    }`}
                >
                    {goal.status}
                </span>

            </div>


            {/* Description */}
            <p className="mt-4 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
                {goal.target ||
                    "Build the skills required to achieve this learning goal."}
            </p>


            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                <div className="px-3 py-4 text-center">
                    <p className="text-xs font-medium text-slate-400">
                        Skills
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                        {skills.length}
                    </p>
                </div>


                <div className="px-3 py-4 text-center">
                    <p className="text-xs font-medium text-slate-400">
                        Weekly Hours
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                        {goal.weeklyHours || 0}
                    </p>
                </div>


                <div className="px-3 py-4 text-center">
                    <p className="text-xs font-medium text-slate-400">
                        Status
                    </p>

                    <p className="mt-1 text-lg font-bold capitalize text-emerald-600">
                        {goal.status || "active"}
                    </p>
                </div>

            </div>


            {/* Skills */}
            <div className="mt-6">

                <div className="flex items-center justify-between">

                    <h4 className="text-sm font-bold text-slate-800">
                        Required Skills
                    </h4>

                    <span className="text-xs font-medium text-slate-400">
                        {skills.length} skills
                    </span>

                </div>


                <div className="mt-3 flex flex-wrap gap-2">

                    {visibleSkills.map((item, index) => {

                        const skillName =
                            item.skillId?.name ||
                            "Unknown Skill";

                        const level =
                            Math.round(
                                (item.requiredLevel || 0) *
                                100
                            );

                        return (
                            <div
                                key={
                                    item.skillId?._id ||
                                    index
                                }
                                className="group/skill rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-indigo-200 hover:bg-indigo-50"
                            >
                                <div className="flex items-center gap-2">

                                    <span className="text-xs font-semibold text-slate-700 group-hover/skill:text-indigo-700">
                                        {skillName}
                                    </span>

                                    <span className="text-[10px] font-bold text-indigo-500">
                                        {level}%
                                    </span>

                                </div>
                            </div>
                        );
                    })}

                    {skills.length > 8 && (
                        <div className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-400">
                            +{skills.length - 8} more
                        </div>
                    )}

                </div>

            </div>


            {/* Bottom */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                <div className="text-xs text-slate-400">
                    Adaptive learning goal
                </div>

                <button
                    className="text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                     onClick={() => navigate(`/goals/${goal._id}`)}
    className="..."
                >
                    View details →
                </button>

            </div>

        </article>
    );
}

export default Goals;