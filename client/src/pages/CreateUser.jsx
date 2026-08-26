import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function CreateUser() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        experienceLevel: "beginner",
        weeklyHours: 5,
        learningStyle: "mixed"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    const saveUserSession = (user) => {

        localStorage.setItem(
            "currentUserId",
            user._id
        );

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!form.name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!form.email.trim()) {
            setError("Please enter your email.");
            return;
        }

        try {

            setLoading(true);

            /*
             * ----------------------------------------
             * First check whether this email exists
             * ----------------------------------------
             */

            const existingUser =
                await api.getUserByEmail(
                    form.email.trim()
                );


            /*
             * ----------------------------------------
             * Existing user
             * ----------------------------------------
             */

            if (existingUser?.user) {

                saveUserSession(
                    existingUser.user
                );

                navigate("/dashboard");

                return;
            }


            /*
             * ----------------------------------------
             * New user
             * ----------------------------------------
             */

            const result =
                await api.createUser({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    experienceLevel:
                        form.experienceLevel,
                    weeklyHours:
                        Number(form.weeklyHours),
                    learningStyle:
                        form.learningStyle
                });


            if (!result?.user) {
                throw new Error(
                    "User was created but user data was not returned."
                );
            }


            /*
             * Save newly created user
             */

            saveUserSession(
                result.user
            );


            /*
             * Go to dashboard
             */

            navigate("/dashboard");


        } catch (error) {

            console.error(
                "User creation error:",
                error
            );

            setError(
                error.message ||
                "Unable to create your profile."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-5xl">

                {/* Header */}

                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white text-2xl font-bold shadow-lg shadow-indigo-200">
                        A
                    </div>

                    <p className="mt-5 text-xs font-bold tracking-[0.2em] text-indigo-600">
                        ADAPTIVE LEARNING ENGINE
                    </p>

                    <h1 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">
                        Build your learning profile
                    </h1>

                    <p className="mt-3 text-slate-500 max-w-xl mx-auto leading-7">
                        Tell us a little about yourself so we can
                        personalize your learning journey.
                    </p>

                </div>


                {/* Card */}

                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">

                    <form onSubmit={handleSubmit}>

                        <div className="p-7 lg:p-10">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                                {/* Left */}

                                <div>

                                    <div className="mb-7">

                                        <p className="text-xs font-bold tracking-[0.18em] text-indigo-600">
                                            ABOUT YOU
                                        </p>

                                        <h2 className="text-xl font-bold text-slate-900 mt-2">
                                            Basic information
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            This information helps identify
                                            your learning profile.
                                        </p>

                                    </div>


                                    {/* Name */}

                                    <div className="mb-5">

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Full name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                                        />

                                    </div>


                                    {/* Email */}

                                    <div className="mb-5">

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                                        />

                                        <p className="text-xs text-slate-400 mt-2">
                                            We'll use your email to find your
                                            existing learning profile.
                                        </p>

                                    </div>


                                    {/* Experience */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Experience level
                                        </label>

                                        <select
                                            name="experienceLevel"
                                            value={form.experienceLevel}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                                        >

                                            <option value="beginner">
                                                Beginner
                                            </option>

                                            <option value="intermediate">
                                                Intermediate
                                            </option>

                                            <option value="advanced">
                                                Advanced
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                {/* Right */}

                                <div>

                                    <div className="mb-7">

                                        <p className="text-xs font-bold tracking-[0.18em] text-indigo-600">
                                            LEARNING PREFERENCES
                                        </p>

                                        <h2 className="text-xl font-bold text-slate-900 mt-2">
                                            How do you learn?
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            We'll use these preferences when
                                            building your learning path.
                                        </p>

                                    </div>


                                    {/* Weekly hours */}

                                    <div className="mb-7">

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Weekly learning hours
                                        </label>

                                        <div className="flex items-center gap-4">

                                            <input
                                                type="range"
                                                name="weeklyHours"
                                                min="1"
                                                max="40"
                                                value={form.weeklyHours}
                                                onChange={handleChange}
                                                className="flex-1 accent-indigo-600"
                                            />

                                            <div className="w-20 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                                <span className="font-bold text-indigo-700">
                                                    {form.weeklyHours}
                                                </span>

                                                <span className="text-xs text-indigo-500 ml-1">
                                                    hrs
                                                </span>
                                            </div>

                                        </div>

                                        <div className="flex justify-between text-xs text-slate-400 mt-2">
                                            <span>1 hr</span>
                                            <span>40 hrs</span>
                                        </div>

                                    </div>


                                    {/* Learning style */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                                            Preferred learning style
                                        </label>

                                        <div className="grid grid-cols-2 gap-3">

                                            {[
                                                {
                                                    value: "visual",
                                                    title: "Visual",
                                                    description: "Diagrams & visuals"
                                                },
                                                {
                                                    value: "reading",
                                                    title: "Reading",
                                                    description: "Articles & docs"
                                                },
                                                {
                                                    value: "hands-on",
                                                    title: "Hands-on",
                                                    description: "Projects & practice"
                                                },
                                                {
                                                    value: "mixed",
                                                    title: "Mixed",
                                                    description: "A combination"
                                                }
                                            ].map((style) => (

                                                <button
                                                    type="button"
                                                    key={style.value}
                                                    onClick={() =>
                                                        setForm(
                                                            (previous) => ({
                                                                ...previous,
                                                                learningStyle:
                                                                    style.value
                                                            })
                                                        )
                                                    }
                                                    className={`text-left p-4 rounded-2xl border-2 transition ${
                                                        form.learningStyle ===
                                                        style.value
                                                            ? "border-indigo-500 bg-indigo-50"
                                                            : "border-slate-200 bg-white hover:border-slate-300"
                                                    }`}
                                                >

                                                    <div className="flex items-center justify-between">

                                                        <span className="font-bold text-slate-900">
                                                            {style.title}
                                                        </span>

                                                        {form.learningStyle ===
                                                            style.value && (
                                                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                                                                ✓
                                                            </span>
                                                        )}

                                                    </div>

                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {style.description}
                                                    </p>

                                                </button>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Error */}

                            {error && (

                                <div className="mt-8 p-4 rounded-2xl bg-red-50 border border-red-100">

                                    <div className="flex gap-3">

                                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold shrink-0">
                                            !
                                        </div>

                                        <p className="text-sm font-medium text-red-700">
                                            {error}
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* Footer */}

                        <div className="px-7 lg:px-10 py-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            <div>

                                <p className="text-sm font-semibold text-slate-700">
                                    Ready to start learning?
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                    Your profile will power your adaptive
                                    learning experience.
                                </p>

                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                                className="px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                            >

                                {loading
                                    ? "Setting up..."
                                    : "Create My Profile →"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CreateUser;