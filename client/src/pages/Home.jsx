import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen overflow-hidden bg-[#f8f9fc] text-slate-900">

            {/* =====================================================
                NAVBAR
            ====================================================== */}
            <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

                    {/* Logo */}
                    <button
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-200 transition group-hover:scale-105">
                            L
                        </div>

                        <div className="text-left">
                            <p className="text-base font-bold tracking-tight text-slate-900">
                                LearnPath
                            </p>

                            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
                                Adaptive Learning
                            </p>
                        </div>
                    </button>


                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#features"
                            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
                        >
                            How it works
                        </a>

                        <a
                            href="#benefits"
                            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
                        >
                            Benefits
                        </a>
                    </div>


                    {/* Nav CTA */}
                    <button
                        onClick={() => navigate("/onboarding")}
                        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200"
                    >
                        Get Started
                    </button>

                </div>
            </nav>


            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative overflow-hidden">

                {/* Background decoration */}
                <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

                <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:grid-cols-2 lg:px-10 lg:pb-28">

                    {/* Hero text */}
                    <div className="relative">

                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3.5 py-2 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />

                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-700">
                                Personalized Learning Engine
                            </span>
                        </div>


                        {/* Heading */}
                        <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">

                            Your goals.

                            <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                                Your skills.
                            </span>

                            <span className="block">
                                Your learning path.
                            </span>

                        </h1>


                        {/* Description */}
                        <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                            Stop guessing what to learn next. Define your
                            goal, discover the skills you need, identify your
                            gaps, and follow a personalized learning journey
                            built around you.
                        </p>


                        {/* Buttons */}
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                            <button
                                onClick={() => navigate("/onboarding")}
                                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200"
                            >
                                Start Your Learning Journey

                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </button>


                            <a
                                href="#how-it-works"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600"
                            >
                                See How It Works
                            </a>

                        </div>


                        {/* Trust indicators */}
                        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-400">

                            <div className="flex items-center gap-2">
                                <span className="text-emerald-500">✓</span>
                                Goal-based learning
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-emerald-500">✓</span>
                                Skill gap analysis
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-emerald-500">✓</span>
                                Personalized resources
                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        HERO DASHBOARD PREVIEW
                    ================================================== */}
                    <div className="relative">

                        {/* Glow */}
                        <div className="absolute inset-10 rounded-full bg-indigo-300/30 blur-3xl" />


                        {/* Main dashboard card */}
                        <div className="relative rounded-3xl border border-white bg-white p-3 shadow-2xl shadow-slate-300/50">

                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                                {/* Fake browser header */}
                                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                                    <div className="flex gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                    </div>

                                    <div className="rounded-md bg-slate-100 px-10 py-1 text-[9px] text-slate-400">
                                        learnpath.app
                                    </div>

                                    <div className="h-5 w-5 rounded-full bg-indigo-100" />

                                </div>


                                {/* Dashboard */}
                                <div className="p-5 sm:p-7">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                                                Learning Dashboard
                                            </p>

                                            <h3 className="mt-1 text-lg font-bold text-slate-900">
                                                Welcome back 👋
                                            </h3>
                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                                            🎯
                                        </div>

                                    </div>


                                    {/* Mini stats */}
                                    <div className="mt-6 grid grid-cols-3 gap-3">

                                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                                            <p className="text-[9px] text-slate-400">
                                                Goals
                                            </p>

                                            <p className="mt-1 text-lg font-bold">
                                                2
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                                            <p className="text-[9px] text-slate-400">
                                                Skills
                                            </p>

                                            <p className="mt-1 text-lg font-bold">
                                                12
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                                            <p className="text-[9px] text-slate-400">
                                                Progress
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-emerald-600">
                                                68%
                                            </p>
                                        </div>

                                    </div>


                                    {/* Goal */}
                                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">

                                        <div className="flex items-start justify-between">

                                            <div>
                                                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                                                    Current Goal
                                                </p>

                                                <h4 className="mt-1 text-sm font-bold text-slate-900">
                                                    Become a Full Stack Developer
                                                </h4>
                                            </div>

                                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
                                                Active
                                            </span>

                                        </div>


                                        {/* Skills */}
                                        <div className="mt-5 space-y-3">

                                            <MiniSkill
                                                name="JavaScript"
                                                percentage={85}
                                            />

                                            <MiniSkill
                                                name="React"
                                                percentage={68}
                                            />

                                            <MiniSkill
                                                name="Node.js"
                                                percentage={52}
                                            />

                                            <MiniSkill
                                                name="MongoDB"
                                                percentage={40}
                                            />

                                        </div>

                                    </div>


                                    {/* Bottom learning card */}
                                    <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white">

                                        <div className="flex items-center justify-between">

                                            <div>
                                                <p className="text-[9px] font-semibold uppercase tracking-wider text-indigo-200">
                                                    Up next
                                                </p>

                                                <p className="mt-1 text-sm font-bold">
                                                    React State Management
                                                </p>
                                            </div>

                                            <span className="text-lg">
                                                →
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Floating skill gap card */}
                        <div className="absolute -bottom-7 -left-5 hidden w-52 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-700">
                                    Skill Gap
                                </span>

                                <span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-600">
                                    3 gaps
                                </span>
                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                            </div>

                            <p className="mt-2 text-[10px] text-slate-400">
                                Your learning path is adapting to your progress.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FEATURES
            ====================================================== */}
            <section
                id="features"
                className="border-y border-slate-200 bg-white"
            >

                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                            Everything in one place
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Learning that starts with your goal
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
                            Instead of giving everyone the same curriculum,
                            LearnPath builds your journey around where you are
                            and where you want to go.
                        </p>

                    </div>


                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        <FeatureCard
                            icon="🎯"
                            title="Goal Based"
                            description="Define the outcome you want to achieve and let the system work backwards to determine what you need to learn."
                        />

                        <FeatureCard
                            icon="🧠"
                            title="Skill Analysis"
                            description="Understand the difference between your current abilities and the skills required for your target."
                        />

                        <FeatureCard
                            icon="🗺️"
                            title="Learning Path"
                            description="Get an organized sequence of topics designed to move you from your current level toward your goal."
                        />

                        <FeatureCard
                            icon="📚"
                            title="Resources"
                            description="Find relevant learning resources for the topics and skills that matter to your journey."
                        />

                    </div>

                </div>

            </section>


            {/* =====================================================
                HOW IT WORKS
            ====================================================== */}
            <section
                id="how-it-works"
                className="relative overflow-hidden bg-[#f8f9fc]"
            >

                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        {/* Left */}
                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                                Simple process
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                From ambition to action.
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                                You don't need to know exactly what to study.
                                You only need to know where you want to go.
                            </p>


                            <div className="mt-10 space-y-7">

                                <Step
                                    number="01"
                                    title="Set your goal"
                                    description="Tell us what you want to achieve — whether it's becoming a developer, learning data science, or mastering a new skill."
                                />

                                <Step
                                    number="02"
                                    title="Discover your skill gaps"
                                    description="Your current skills are compared with the capabilities required to reach your goal."
                                />

                                <Step
                                    number="03"
                                    title="Follow your learning path"
                                    description="Learn the topics that matter most, using resources selected around your identified gaps."
                                />

                                <Step
                                    number="04"
                                    title="Track and improve"
                                    description="As your skills grow, your progress and learning journey can evolve with you."
                                />

                            </div>

                        </div>


                        {/* Right visual */}
                        <div className="relative">

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-xs font-semibold text-slate-400">
                                            SKILL GAP ANALYSIS
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold text-slate-900">
                                            Full Stack Developer
                                        </h3>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                                        📊
                                    </div>

                                </div>


                                <div className="mt-8 space-y-6">

                                    <GapBar
                                        skill="JavaScript"
                                        current="60%"
                                        required="85%"
                                        width="70%"
                                    />

                                    <GapBar
                                        skill="React"
                                        current="35%"
                                        required="80%"
                                        width="44%"
                                    />

                                    <GapBar
                                        skill="Node.js"
                                        current="25%"
                                        required="75%"
                                        width="33%"
                                    />

                                    <GapBar
                                        skill="MongoDB"
                                        current="55%"
                                        required="70%"
                                        width="78%"
                                    />

                                </div>


                                <div className="mt-8 rounded-2xl bg-indigo-50 p-4">

                                    <div className="flex gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm text-white">
                                            ✦
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-indigo-900">
                                                Personalized recommendation
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-indigo-700">
                                                Focus on React and Node.js next.
                                                These currently represent your
                                                largest skill gaps.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                BENEFITS
            ====================================================== */}
            <section
                id="benefits"
                className="bg-white"
            >

                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div className="relative">

                            <div className="absolute inset-0 rounded-full bg-indigo-100/50 blur-3xl" />

                            <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">

                                <div className="rounded-2xl border border-slate-200 bg-white p-5">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Your next lessons
                                            </p>

                                            <h3 className="mt-1 text-lg font-bold text-slate-900">
                                                Personalized for you
                                            </h3>
                                        </div>

                                        <span className="rounded-xl bg-indigo-50 px-3 py-2 text-lg">
                                            ✨
                                        </span>

                                    </div>


                                    <div className="mt-6 space-y-3">

                                        <ResourceItem
                                            icon="🎥"
                                            title="React Hooks"
                                            type="Video lesson"
                                            active
                                        />

                                        <ResourceItem
                                            icon="📖"
                                            title="Context API"
                                            type="Documentation"
                                        />

                                        <ResourceItem
                                            icon="💻"
                                            title="State Management"
                                            type="Practice"
                                        />

                                        <ResourceItem
                                            icon="📝"
                                            title="Build a React Project"
                                            type="Project"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                                Learn smarter
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                Spend less time deciding what to learn.
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                                Most learners don't struggle because they lack
                                information. They struggle because there is too
                                much of it.
                            </p>


                            <div className="mt-8 space-y-5">

                                <Benefit
                                    title="Know what matters"
                                    description="Focus on skills directly connected to your goal instead of following an endless list of tutorials."
                                />

                                <Benefit
                                    title="Understand your gaps"
                                    description="See exactly where your current level falls short of the level your goal requires."
                                />

                                <Benefit
                                    title="Learn with purpose"
                                    description="Every topic in your path has a reason for being there."
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FINAL CTA
            ====================================================== */}
            <section className="relative overflow-hidden bg-slate-950">

                <div className="absolute -left-20 -top-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

                <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-2xl">
                        🚀
                    </div>

                    <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Your next level starts here.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                        Tell us where you want to go. We'll help you understand
                        what it takes to get there.
                    </p>

                    <button
                        onClick={() => navigate("/onboarding")}
                        className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-xl transition hover:-translate-y-1 hover:bg-indigo-50"
                    >
                        Create Your Learning Plan

                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </button>

                </div>

            </section>


            {/* =====================================================
                FOOTER
            ====================================================== */}
            <footer className="border-t border-slate-800 bg-slate-950">

                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

                    <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                            L
                        </div>

                        <span className="text-sm font-bold text-white">
                            LearnPath
                        </span>

                    </div>

                    <p className="text-xs text-slate-500">
                        Personalized learning, built around your goals.
                    </p>

                    <p className="text-xs text-slate-600">
                        © 2026 LearnPath
                    </p>

                </div>

            </footer>

        </div>
    );
}


/* =============================================================
   COMPONENTS
============================================================= */

function MiniSkill({ name, percentage }) {
    return (
        <div>

            <div className="mb-1.5 flex items-center justify-between">

                <span className="text-[10px] font-semibold text-slate-600">
                    {name}
                </span>

                <span className="text-[9px] font-bold text-indigo-600">
                    {percentage}%
                </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width: `${percentage}%` }}
                />

            </div>

        </div>
    );
}


function FeatureCard({ icon, title, description }) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl transition duration-300 group-hover:scale-110">
                {icon}
            </div>

            <h3 className="mt-5 text-base font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>

        </div>
    );
}


function Step({ number, title, description }) {
    return (
        <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-lg shadow-indigo-100">
                {number}
            </div>

            <div>

                <h3 className="text-base font-bold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                </p>

            </div>

        </div>
    );
}


function GapBar({ skill, current, required, width }) {
    return (
        <div>

            <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-700">
                    {skill}
                </span>

                <div className="flex gap-3 text-[10px]">
                    <span className="font-medium text-slate-400">
                        Current {current}
                    </span>

                    <span className="font-bold text-indigo-600">
                        Target {required}
                    </span>
                </div>

            </div>

            <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width }}
                />

            </div>

        </div>
    );
}


function ResourceItem({ icon, title, type, active }) {
    return (
        <div
            className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                active
                    ? "border-indigo-100 bg-indigo-50/60"
                    : "border-slate-100 bg-white"
            }`}
        >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm">
                {icon}
            </div>

            <div className="min-w-0 flex-1">

                <p className="truncate text-xs font-bold text-slate-800">
                    {title}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                    {type}
                </p>

            </div>

            <span className="text-slate-300">
                →
            </span>

        </div>
    );
}


function Benefit({ title, description }) {
    return (
        <div className="flex gap-4">

            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                ✓
            </div>

            <div>

                <h3 className="text-sm font-bold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                </p>

            </div>

        </div>
    );
}


export default Home;