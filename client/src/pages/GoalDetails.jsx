import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { getCurrentUserId } from "../config";

function GoalDetails() {
    const { goalId } = useParams();
    const navigate = useNavigate();

    // Get the currently logged-in/selected user's ID
    const userId = getCurrentUserId();

    const [goal, setGoal] = useState(null);
    const [skillGaps, setSkillGaps] = useState(null);
    const [learningPath, setLearningPath] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadGoalDetails = async () => {
            try {
                setLoading(true);
                setError("");

                // Make sure we have a current user
                if (!userId) {
                    setError(
                        "No user found. Please create an account or log in first."
                    );
                    return;
                }

                const [
                    goalResponse,
                    gapResponse,
                    pathResponse
                ] = await Promise.all([
                    api.getGoal(
                        userId,
                        goalId
                    ),

                    api.getSkillGaps(
                        userId,
                        goalId
                    ),

                    api.getLearningPath(
                        userId,
                        goalId
                    )
                ]);

                setGoal(goalResponse.goal);
                setSkillGaps(gapResponse);
                setLearningPath(pathResponse);

            } catch (error) {
                console.error(
                    "Goal details error:",
                    error
                );

                setError(
                    "Unable to load goal analysis."
                );
            } finally {
                setLoading(false);
            }
        };

        loadGoalDetails();
    }, [goalId, userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />

                    <p className="text-slate-600 font-medium">
                        Analyzing your learning goal...
                    </p>

                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

                <div className="bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm max-w-md">

                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                        Something went wrong
                    </h2>

                    <p className="text-slate-500 mb-6">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/goals")}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                        Back to Goals
                    </button>

                </div>
            </div>
        );
    }

    if (!goal) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">

            <div className="max-w-7xl mx-auto">

                {/* Back button */}

                <button
                    onClick={() => navigate("/goals")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition mb-6"
                >
                    ← Back to goals
                </button>


                {/* =========================================
                    GOAL HEADER
                ========================================== */}

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="p-8 lg:p-10">

                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                            <div>

                                <div className="flex items-center gap-3 mb-4">

                                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                                        Learning Goal
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold capitalize">
                                        {goal.status}
                                    </span>

                                </div>

                                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                                    {goal.title}
                                </h1>

                                <p className="mt-4 text-slate-500 max-w-3xl leading-7">
                                    {goal.target ||
                                        "Your personalized learning journey."}
                                </p>

                            </div>


                            {/* =========================================
                                HEADER ACTIONS + STATS
                            ========================================== */}

                            <div className="flex flex-col sm:flex-row gap-3">

                                {/* Analyze Skill Gaps Button */}

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/goals/${goal._id}/skill-gaps`
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-sm shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
                                        />

                                    </svg>

                                    Analyze Skill Gaps

                                </button>


                                {/* Existing Skills Card */}

                                <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[120px]">

                                    <p className="text-xs text-slate-400 font-semibold uppercase">
                                        Skills
                                    </p>

                                    <p className="text-2xl font-bold text-slate-900 mt-1">
                                        {goal.requiredSkills?.length || 0}
                                    </p>

                                </div>


                                {/* Existing Weekly Card */}

                                <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[120px]">

                                    <p className="text-xs text-slate-400 font-semibold uppercase">
                                        Weekly
                                    </p>

                                    <p className="text-2xl font-bold text-slate-900 mt-1">

                                        {goal.weeklyHours || 0}

                                        <span className="text-sm font-medium text-slate-400 ml-1">
                                            hrs
                                        </span>

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    OVERVIEW
                ========================================== */}

                <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

                    <OverviewCard
                        title="Required Skills"
                        value={
                            goal.requiredSkills?.length || 0
                        }
                        description="Skills needed for this goal"
                    />

                    <OverviewCard
                        title="Skill Gaps"
                        value={
                            skillGaps?.gaps?.length ||
                            skillGaps?.skillGaps?.length ||
                            0
                        }
                        description="Areas that need improvement"
                    />

                    <OverviewCard
                        title="Learning Path"
                        value={
                            learningPath?.steps?.length ||
                            learningPath?.path?.length ||
                            0
                        }
                        description="Recommended learning steps"
                    />

                </section>


                {/* =========================================
                    SKILL GAP ANALYSIS
                ========================================== */}

                <section className="mt-10">

                    <SectionHeading
                        eyebrow="ANALYSIS"
                        title="Skill Gap Analysis"
                        description="See where your current skills stand compared with what your goal requires."
                    />

                    <div className="mt-5 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

                        {renderSkillGaps(skillGaps)}

                    </div>

                </section>


                {/* =========================================
                    LEARNING PATH
                ========================================== */}

                <section className="mt-10 pb-12">

                    <SectionHeading
                        eyebrow="YOUR PATH"
                        title="Recommended Learning Path"
                        description="Follow these steps to move toward your goal."
                    />

                    <div className="mt-5">

                        {renderLearningPath(learningPath)}

                    </div>

                </section>

            </div>
        </div>
    );
}


/* =============================================
   Overview Card
============================================= */

function OverviewCard({
    title,
    value,
    description
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <p className="text-sm font-semibold text-slate-500">
                {title}
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-2">
                {value}
            </p>

            <p className="text-sm text-slate-400 mt-1">
                {description}
            </p>

        </div>
    );
}


/* =============================================
   Section Heading
============================================= */

function SectionHeading({
    eyebrow,
    title,
    description
}) {
    return (
        <div>

            <p className="text-xs font-bold tracking-[0.18em] text-indigo-600">
                {eyebrow}
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-2">
                {title}
            </h2>

            <p className="text-slate-500 mt-1">
                {description}
            </p>

        </div>
    );
}


/* =============================================
   Skill Gaps
============================================= */

function renderSkillGaps(data) {

    const gaps =
        data?.gaps ||
        data?.skillGaps ||
        [];

    if (!gaps.length) {
        return (
            <div className="p-10 text-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">
                    ✓
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                    No skill gaps found
                </h3>

                <p className="text-slate-500 mt-1">
                    You're currently meeting the required skill levels.
                </p>

            </div>
        );
    }

    return (
        <div className="divide-y divide-slate-100">

            {gaps.map((gap, index) => {

                const skillName =
                    gap.skill?.name ||
                    gap.skillName ||
                    gap.name ||
                    `Skill ${index + 1}`;

                const current =
                    gap.currentLevel ??
                    gap.currentMastery ??
                    gap.mastery ??
                    0;

                const required =
                    gap.requiredLevel ??
                    gap.targetLevel ??
                    1;

                const gapValue =
                    gap.gap ??
                    Math.max(
                        required - current,
                        0
                    );

                return (
                    <div
                        key={gap._id || index}
                        className="p-6"
                    >

                        <div className="flex justify-between items-center gap-4">

                            <div>

                                <h3 className="font-bold text-slate-900">
                                    {skillName}
                                </h3>

                                <p className="text-sm text-slate-400 mt-1">
                                    Current:{" "}
                                    {Math.round(current * 100)}%
                                    {" • "}
                                    Required:{" "}
                                    {Math.round(required * 100)}%
                                </p>

                            </div>

                            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-bold">
                                {Math.round(gapValue * 100)}% gap
                            </span>

                        </div>


                        <div className="mt-4">

                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-indigo-600 rounded-full transition-all"
                                    style={{
                                        width: `${Math.min(
                                            current * 100,
                                            100
                                        )}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


/* =============================================
   Learning Path
============================================= */

function renderLearningPath(data) {

    const steps =
        data?.steps ||
        data?.path ||
        data?.learningPath ||
        [];

    if (!steps.length) {
        return (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center">

                <h3 className="font-bold text-slate-900">
                    Learning path is not available yet
                </h3>

                <p className="text-slate-500 mt-2">
                    Complete your skill analysis first.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-4">

            {steps.map((step, index) => {

                const title =
                    step.skill?.name ||
                    step.skillName ||
                    step.title ||
                    step.name ||
                    `Learning Step ${index + 1}`;

                const description =
                    step.description ||
                    step.reason ||
                    "Build your knowledge and practical ability in this area.";

                return (
                    <div
                        key={step._id || index}
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                    >

                        <div className="flex gap-5">

                            <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                                {index + 1}
                            </div>

                            <div className="flex-1">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                    <h3 className="font-bold text-lg text-slate-900">
                                        {title}
                                    </h3>

                                    {step.estimatedHours && (
                                        <span className="text-sm text-slate-400">
                                            {step.estimatedHours} hrs
                                        </span>
                                    )}

                                </div>

                                <p className="text-slate-500 text-sm mt-2 leading-6">
                                    {description}
                                </p>

                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


export default GoalDetails;