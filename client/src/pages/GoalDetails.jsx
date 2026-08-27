import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { getCurrentUserId } from "../config";

/*
=========================================================
FRONTEND QUIZ QUESTION BANK
=========================================================

Because we are not modifying the backend, quiz questions
are maintained on the frontend.

You can keep adding questions for more skills here.
*/

const QUIZ_BANK = {
    javascript: [
        {
            question: "Which keyword is used to declare a block-scoped variable?",
            options: ["var", "let", "define", "variable"],
            answer: "let"
        },
        {
            question: "What does === check in JavaScript?",
            options: [
                "Only value",
                "Only type",
                "Value and type",
                "Variable name"
            ],
            answer: "Value and type"
        },
        {
            question: "Which method is used to add an element to the end of an array?",
            options: ["push()", "pop()", "shift()", "join()"],
            answer: "push()"
        },
        {
            question: "What does JSON.parse() do?",
            options: [
                "Converts JSON string into JavaScript object",
                "Converts object into JSON",
                "Deletes JSON",
                "Validates CSS"
            ],
            answer: "Converts JSON string into JavaScript object"
        },
        {
            question: "Which of these is a JavaScript framework/library?",
            options: ["React", "Django", "Laravel", "Spring"],
            answer: "React"
        }
    ],

    react: [
        {
            question: "What is JSX?",
            options: [
                "A JavaScript syntax extension",
                "A database",
                "A CSS framework",
                "A backend server"
            ],
            answer: "A JavaScript syntax extension"
        },
        {
            question: "Which hook is commonly used to manage component state?",
            options: ["useState", "useRoute", "useServer", "useDatabase"],
            answer: "useState"
        },
        {
            question: "Which hook is used for side effects?",
            options: ["useEffect", "useStyle", "useFetchOnly", "useHTML"],
            answer: "useEffect"
        },
        {
            question: "What is the purpose of a React key when rendering lists?",
            options: [
                "Help React identify list items",
                "Style the list",
                "Create CSS",
                "Connect to MongoDB"
            ],
            answer: "Help React identify list items"
        },
        {
            question: "Which statement is true about React components?",
            options: [
                "They can be reusable UI building blocks",
                "They can only contain CSS",
                "They must always connect to a database",
                "They cannot receive data"
            ],
            answer: "They can be reusable UI building blocks"
        }
    ],

    node: [
        {
            question: "What is Node.js?",
            options: [
                "A JavaScript runtime",
                "A CSS framework",
                "A database",
                "A browser"
            ],
            answer: "A JavaScript runtime"
        },
        {
            question: "Which package manager is commonly used with Node.js?",
            options: ["npm", "pip", "composer", "gradle"],
            answer: "npm"
        },
        {
            question: "Which object provides information about the current Node.js process?",
            options: ["process", "window", "document", "browser"],
            answer: "process"
        },
        {
            question: "Which module system is traditionally used by Node.js?",
            options: [
                "CommonJS",
                "CSS Modules",
                "HTML Modules",
                "XML Modules"
            ],
            answer: "CommonJS"
        },
        {
            question: "Which framework is commonly used to build APIs with Node.js?",
            options: ["Express", "Tailwind", "Bootstrap", "React Native"],
            answer: "Express"
        }
    ],

    mongodb: [
        {
            question: "What type of database is MongoDB?",
            options: [
                "Document database",
                "Relational database",
                "Graph-only database",
                "Spreadsheet database"
            ],
            answer: "Document database"
        },
        {
            question: "Which format is commonly associated with MongoDB documents?",
            options: ["BSON", "HTML", "CSS", "CSV"],
            answer: "BSON"
        },
        {
            question: "What is a MongoDB collection similar to in a relational database?",
            options: ["Table", "Column", "Row", "Index only"],
            answer: "Table"
        },
        {
            question: "Which command is commonly used to retrieve documents?",
            options: ["find()", "select()", "getRows()", "fetchTable()"],
            answer: "find()"
        },
        {
            question: "Which ODM is commonly used with MongoDB in Node.js?",
            options: ["Mongoose", "Redux", "React Router", "Vite"],
            answer: "Mongoose"
        }
    ],

    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "HyperTool Multi Language",
                "HomeText Markup Language"
            ],
            answer: "HyperText Markup Language"
        },
        {
            question: "Which tag is used for the largest heading?",
            options: ["<h1>", "<h6>", "<heading>", "<head>"],
            answer: "<h1>"
        },
        {
            question: "Which tag creates a hyperlink?",
            options: ["<a>", "<link>", "<href>", "<url>"],
            answer: "<a>"
        },
        {
            question: "Which element is used to display an image?",
            options: ["<img>", "<image>", "<picture-only>", "<src>"],
            answer: "<img>"
        },
        {
            question: "Which HTML element is semantic?",
            options: ["<article>", "<div>", "<span>", "<box>"],
            answer: "<article>"
        }
    ],

    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Computer Style Syntax",
                "Creative Styling System",
                "Colorful Style Sheets"
            ],
            answer: "Cascading Style Sheets"
        },
        {
            question: "Which property changes text color?",
            options: ["color", "font-color", "text-color", "foreground"],
            answer: "color"
        },
        {
            question: "Which layout system is commonly used for one-dimensional layouts?",
            options: ["Flexbox", "SQL", "MongoDB", "Node"],
            answer: "Flexbox"
        },
        {
            question: "Which property controls space inside an element?",
            options: ["padding", "margin", "spacing", "inside-space"],
            answer: "padding"
        },
        {
            question: "Which unit is relative to the root font size?",
            options: ["rem", "px", "cm", "pt"],
            answer: "rem"
        }
    ],

    python: [
        {
            question: "Which keyword defines a function in Python?",
            options: ["def", "function", "func", "define"],
            answer: "def"
        },
        {
            question: "Which data type stores key-value pairs?",
            options: ["Dictionary", "Tuple", "Set", "String"],
            answer: "Dictionary"
        },
        {
            question: "Which symbol starts a comment in Python?",
            options: ["#", "//", "/*", "--"],
            answer: "#"
        },
        {
            question: "Which function is used to get the length of an object?",
            options: ["len()", "length()", "size()", "count()"],
            answer: "len()"
        },
        {
            question: "Which keyword is used to create a class?",
            options: ["class", "object", "struct", "model"],
            answer: "class"
        }
    ],

    sql: [
        {
            question: "Which SQL command retrieves data?",
            options: ["SELECT", "GET", "FETCHROW", "READ"],
            answer: "SELECT"
        },
        {
            question: "Which clause filters rows?",
            options: ["WHERE", "FILTER", "WHEN", "HAVING_ONLY"],
            answer: "WHERE"
        },
        {
            question: "Which command adds new records?",
            options: ["INSERT", "ADD", "CREATE ROW", "APPEND SQL"],
            answer: "INSERT"
        },
        {
            question: "Which command modifies existing records?",
            options: ["UPDATE", "CHANGE", "MODIFY ROW", "ALTER DATA"],
            answer: "UPDATE"
        },
        {
            question: "Which keyword removes duplicate results?",
            options: ["DISTINCT", "UNIQUE ONLY", "REMOVE", "DEDUP"],
            answer: "DISTINCT"
        }
    ],

    git: [
        {
            question: "Which command initializes a Git repository?",
            options: ["git init", "git start", "git create", "git repo"],
            answer: "git init"
        },
        {
            question: "Which command shows the current repository status?",
            options: [
                "git status",
                "git check",
                "git state",
                "git current"
            ],
            answer: "git status"
        },
        {
            question: "Which command creates a commit?",
            options: [
                "git commit",
                "git save",
                "git push",
                "git snapshot"
            ],
            answer: "git commit"
        },
        {
            question: "Which command sends commits to a remote repository?",
            options: [
                "git push",
                "git send",
                "git upload",
                "git remote-save"
            ],
            answer: "git push"
        },
        {
            question: "Which command downloads remote changes?",
            options: [
                "git pull",
                "git download",
                "git receive",
                "git sync-only"
            ],
            answer: "git pull"
        }
    ]
};


/*
=========================================================
HELPER FUNCTIONS
=========================================================
*/

function normalizeSkillName(name = "") {
    return name
        .toLowerCase()
        .replace(/\.js/g, "")
        .replace(/\.jsx/g, "")
        .replace(/\.ts/g, "")
        .replace(/\.tsx/g, "")
        .replace(/[^a-z0-9]/g, "");
}


function getQuizQuestions(skillName) {
    const normalized = normalizeSkillName(skillName);

    /*
    Try exact match first
    */
    if (QUIZ_BANK[normalized]) {
        return QUIZ_BANK[normalized];
    }

    /*
    Handle common aliases
    */
    if (
        normalized.includes("javascript") ||
        normalized === "js"
    ) {
        return QUIZ_BANK.javascript;
    }

    if (
        normalized.includes("react")
    ) {
        return QUIZ_BANK.react;
    }

    if (
        normalized.includes("node")
    ) {
        return QUIZ_BANK.node;
    }

    if (
        normalized.includes("mongo")
    ) {
        return QUIZ_BANK.mongodb;
    }

    if (
        normalized.includes("html")
    ) {
        return QUIZ_BANK.html;
    }

    if (
        normalized.includes("css") ||
        normalized.includes("tailwind")
    ) {
        return QUIZ_BANK.css;
    }

    if (
        normalized.includes("python")
    ) {
        return QUIZ_BANK.python;
    }

    if (
        normalized.includes("sql")
    ) {
        return QUIZ_BANK.sql;
    }

    if (
        normalized.includes("git") ||
        normalized.includes("github")
    ) {
        return QUIZ_BANK.git;
    }

    /*
    Fallback questions for skills that don't have
    a dedicated question bank yet.
    */

    return [
        {
            question: `What is an important part of learning ${skillName}?`,
            options: [
                "Understanding the fundamentals",
                "Avoiding practice",
                "Never reviewing concepts",
                "Only memorizing answers"
            ],
            answer: "Understanding the fundamentals"
        },
        {
            question: `What is generally the best way to improve your ${skillName} ability?`,
            options: [
                "Practice regularly",
                "Only read titles",
                "Avoid projects",
                "Never test yourself"
            ],
            answer: "Practice regularly"
        },
        {
            question: `Which approach is useful when learning ${skillName}?`,
            options: [
                "Build practical projects",
                "Avoid hands-on work",
                "Skip fundamentals",
                "Never review mistakes"
            ],
            answer: "Build practical projects"
        },
        {
            question: `Why should you test your knowledge of ${skillName}?`,
            options: [
                "To identify knowledge gaps",
                "To avoid learning",
                "To remove practice",
                "To skip concepts"
            ],
            answer: "To identify knowledge gaps"
        },
        {
            question: `What helps maintain progress in ${skillName}?`,
            options: [
                "Consistent practice",
                "Studying once",
                "Avoiding challenges",
                "Ignoring feedback"
            ],
            answer: "Consistent practice"
        }
    ];
}


/*
=========================================================
MAIN COMPONENT
=========================================================
*/

function GoalDetails() {
    const { goalId } = useParams();
    const navigate = useNavigate();

    const userId = getCurrentUserId();

    const [goal, setGoal] = useState(null);
    const [skillGaps, setSkillGaps] = useState(null);
    const [learningPath, setLearningPath] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /*
    =====================================================
    QUIZ STATE
    =====================================================
    */

    const [quizSkill, setQuizSkill] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

    /*
    =====================================================
    FRONTEND SKILL OVERRIDES
    =====================================================

    Backend skill values are never changed.

    Quiz results are stored here and in localStorage.
    */

    const [skillOverrides, setSkillOverrides] = useState({});


    /*
    =====================================================
    LOAD GOAL
    =====================================================
    */

    useEffect(() => {
        const loadGoalDetails = async () => {
            try {
                setLoading(true);
                setError("");

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

                /*
                Load frontend-only quiz results
                */

                const storageKey =
                    `skillProgress_${userId}_${goalId}`;

                const savedProgress =
                    localStorage.getItem(storageKey);

                if (savedProgress) {
                    try {
                        setSkillOverrides(
                            JSON.parse(savedProgress)
                        );
                    } catch {
                        console.warn(
                            "Unable to parse saved skill progress."
                        );
                    }
                }

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


    /*
    =====================================================
    SAVE FRONTEND SKILL PROGRESS
    =====================================================
    */

    const saveSkillProgress = (
        skillKey,
        newLevel,
        score
    ) => {

        const updated = {
            ...skillOverrides,
            [skillKey]: {
                level: newLevel,
                score,
                updatedAt: new Date().toISOString()
            }
        };

        setSkillOverrides(updated);

        const storageKey =
            `skillProgress_${userId}_${goalId}`;

        localStorage.setItem(
            storageKey,
            JSON.stringify(updated)
        );
    };


    /*
    =====================================================
    OPEN QUIZ
    =====================================================
    */

    const openQuiz = (skill) => {

        const skillName =
            skill?.name ||
            skill?.skillName ||
            "this skill";

        const questions =
            getQuizQuestions(skillName);

        setQuizSkill({
            ...skill,
            name: skillName
        });

        setQuizQuestions(questions);

        setQuizAnswers({});

        setCurrentQuestion(0);

        setQuizFinished(false);

        setQuizScore(0);
    };


    /*
    =====================================================
    CLOSE QUIZ
    =====================================================
    */

    const closeQuiz = () => {
        setQuizSkill(null);
        setQuizQuestions([]);
        setQuizAnswers({});
        setCurrentQuestion(0);
        setQuizFinished(false);
        setQuizScore(0);
    };


    /*
    =====================================================
    SELECT ANSWER
    =====================================================
    */

    const handleAnswer = (answer) => {

        setQuizAnswers((previous) => ({
            ...previous,
            [currentQuestion]: answer
        }));
    };


    /*
    =====================================================
    NEXT QUESTION
    =====================================================
    */

    const nextQuestion = () => {

        if (
            currentQuestion <
            quizQuestions.length - 1
        ) {
            setCurrentQuestion(
                (previous) => previous + 1
            );
        }
    };


    /*
    =====================================================
    PREVIOUS QUESTION
    =====================================================
    */

    const previousQuestion = () => {

        if (currentQuestion > 0) {
            setCurrentQuestion(
                (previous) => previous - 1
            );
        }
    };


    /*
    =====================================================
    SUBMIT QUIZ
    =====================================================
    */

    const submitQuiz = () => {

        let correct = 0;

        quizQuestions.forEach(
            (question, index) => {

                if (
                    quizAnswers[index] ===
                    question.answer
                ) {
                    correct++;
                }

            }
        );

        const score = Math.round(
            (correct /
                quizQuestions.length) *
            100
        );

        /*
        Convert quiz score into skill level.

        Example:

        0-39   = 30%
        40-59  = 50%
        60-79  = 70%
        80-100 = 90%
        */

        let newLevel = 0.3;

        if (score >= 80) {
            newLevel = 0.9;
        } else if (score >= 60) {
            newLevel = 0.7;
        } else if (score >= 40) {
            newLevel = 0.5;
        }

        /*
        Never decrease an already achieved
        frontend skill level.
        */

        const skillKey =
            quizSkill?.skillId?._id ||
            quizSkill?.skillId ||
            quizSkill?._id ||
            normalizeSkillName(
                quizSkill?.name
            );

        const oldLevel =
            skillOverrides[skillKey]?.level || 0;

        newLevel =
            Math.max(
                oldLevel,
                newLevel
            );

        saveSkillProgress(
            skillKey,
            newLevel,
            score
        );

        setQuizScore(score);

        setQuizFinished(true);
    };


    /*
    =====================================================
    GET CURRENT SKILL LEVEL
    =====================================================
    */

    const getCurrentSkillLevel = (
        skillName,
        fallbackLevel = 0
    ) => {

        const skillKey =
            normalizeSkillName(skillName);

        /*
        Search all saved overrides by normalized
        skill name as well.
        */

        const override =
            Object.entries(
                skillOverrides
            ).find(
                ([key]) =>
                    key === skillKey ||
                    key.toLowerCase() ===
                    skillKey.toLowerCase()
            );

        if (override) {
            return override[1].level;
        }

        return fallbackLevel;
    };


    /*
    =====================================================
    STATUS STYLE
    =====================================================
    */

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


    /*
    =====================================================
    LOADING
    =====================================================
    */

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


    /*
    =====================================================
    ERROR
    =====================================================
    */

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
                        onClick={() =>
                            navigate("/goals")
                        }
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

                {/* =========================================
                    BACK
                ========================================== */}

                <button
                    onClick={() =>
                        navigate("/goals")
                    }
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


                            <div className="flex flex-col sm:flex-row gap-3">

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


                                <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[120px]">

                                    <p className="text-xs text-slate-400 font-semibold uppercase">
                                        Skills
                                    </p>

                                    <p className="text-2xl font-bold text-slate-900 mt-1">
                                        {goal.requiredSkills?.length || 0}
                                    </p>

                                </div>


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
                        description="Test your knowledge and update your personal skill progress."
                    />

                    <div className="mt-5 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

                        <SkillGapList
                            data={skillGaps}
                            skillOverrides={skillOverrides}
                            getCurrentSkillLevel={
                                getCurrentSkillLevel
                            }
                            onAttemptQuiz={
                                openQuiz
                            }
                        />

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

                        <LearningPathList
                            data={learningPath}
                            getCurrentSkillLevel={
                                getCurrentSkillLevel
                            }
                            onAttemptQuiz={
                                openQuiz
                            }
                        />

                    </div>

                </section>

            </div>


            {/* =========================================
                QUIZ MODAL
            ========================================== */}

            {quizSkill && (
                <QuizModal
                    skill={quizSkill}
                    questions={quizQuestions}
                    answers={quizAnswers}
                    currentQuestion={currentQuestion}
                    finished={quizFinished}
                    score={quizScore}
                    onAnswer={handleAnswer}
                    onNext={nextQuestion}
                    onPrevious={previousQuestion}
                    onSubmit={submitQuiz}
                    onClose={closeQuiz}
                />
            )}

        </div>
    );
}


/*
=========================================================
OVERVIEW CARD
=========================================================
*/

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


/*
=========================================================
SECTION HEADING
=========================================================
*/

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


/*
=========================================================
SKILL GAP LIST
=========================================================
*/

function SkillGapList({
    data,
    getCurrentSkillLevel,
    onAttemptQuiz
}) {

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

                const backendCurrent =
                    gap.currentLevel ??
                    gap.currentMastery ??
                    gap.mastery ??
                    0;

                const current =
                    getCurrentSkillLevel(
                        skillName,
                        backendCurrent
                    );

                const required =
                    gap.requiredLevel ??
                    gap.targetLevel ??
                    1;

                const gapValue =
                    Math.max(
                        required - current,
                        0
                    );

                const currentPercentage =
                    Math.round(
                        current * 100
                    );

                const requiredPercentage =
                    Math.round(
                        required * 100
                    );

                const gapPercentage =
                    Math.round(
                        gapValue * 100
                    );


                return (
                    <div
                        key={
                            gap._id ||
                            index
                        }
                        className="p-6 hover:bg-slate-50/70 transition"
                    >

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex-1">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                    <div>

                                        <h3 className="font-bold text-lg text-slate-900">
                                            {skillName}
                                        </h3>

                                        <p className="text-sm text-slate-400 mt-1">

                                            Current:{" "}
                                            <strong className="text-slate-600">
                                                {currentPercentage}%
                                            </strong>

                                            {" • "}

                                            Required:{" "}
                                            <strong className="text-slate-600">
                                                {requiredPercentage}%
                                            </strong>

                                        </p>

                                    </div>


                                    <div className="flex items-center gap-2">

                                        {gapPercentage > 0 ? (
                                            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-bold">
                                                {gapPercentage}% gap
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold">
                                                Skill target reached
                                            </span>
                                        )}

                                    </div>

                                </div>


                                {/* Progress */}

                                <div className="mt-4">

                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                                            style={{
                                                width: `${Math.min(
                                                    currentPercentage,
                                                    100
                                                )}%`
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* Quiz button */}

                            <button
                                onClick={() =>
                                    onAttemptQuiz({
                                        ...gap,
                                        name: skillName
                                    })
                                }
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
                            >

                                <span className="text-base">
                                    🧠
                                </span>

                                {currentPercentage > 0
                                    ? "Retake Quiz"
                                    : "Attempt Quiz"}

                            </button>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


/*
=========================================================
LEARNING PATH
=========================================================
*/

function LearningPathList({
    data,
    onAttemptQuiz
}) {

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
                        key={
                            step._id ||
                            index
                        }
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                    >

                        <div className="flex flex-col lg:flex-row gap-5">

                            <div className="flex-1 flex gap-5">

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


                            {/* Quiz button */}

                            <div className="flex items-center">

                                <button
                                    onClick={() =>
                                        onAttemptQuiz({
                                            ...step,
                                            name: title
                                        })
                                    }
                                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
                                >

                                    🧠

                                    Attempt Quiz

                                </button>

                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


/*
=========================================================
QUIZ MODAL
=========================================================
*/

function QuizModal({
    skill,
    questions,
    answers,
    currentQuestion,
    finished,
    score,
    onAnswer,
    onNext,
    onPrevious,
    onSubmit,
    onClose
}) {

    const question =
        questions[currentQuestion];

    if (!question) {
        return null;
    }


    /*
    =====================================================
    RESULT SCREEN
    =====================================================
    */

    if (finished) {

        let level = 30;

        if (score >= 80) {
            level = 90;
        } else if (score >= 60) {
            level = 70;
        } else if (score >= 40) {
            level = 50;
        }


        let message =
            "Keep practicing and try the quiz again.";

        if (score >= 80) {
            message =
                "Excellent! You have a strong understanding of this skill.";
        } else if (score >= 60) {
            message =
                "Good progress! Keep practicing to close the remaining gap.";
        } else if (score >= 40) {
            message =
                "You're building the fundamentals. More practice will help.";
        }


        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">

                <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

                    <div className="bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-10 text-center text-white">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 text-4xl">
                            {score >= 60 ? "🎉" : "💪"}
                        </div>

                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
                            Quiz Completed
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {skill.name}
                        </h2>

                        <div className="mt-6 text-6xl font-black">
                            {score}%
                        </div>

                    </div>


                    <div className="p-8">

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                            <div className="flex items-center justify-between">

                                <span className="text-sm font-semibold text-slate-500">
                                    Updated skill level
                                </span>

                                <span className="text-xl font-bold text-indigo-600">
                                    {level}%
                                </span>

                            </div>

                            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">

                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000"
                                    style={{
                                        width: `${level}%`
                                    }}
                                />

                            </div>

                        </div>


                        <p className="mt-5 text-center text-sm leading-6 text-slate-500">
                            {message}
                        </p>


                        <div className="mt-7 flex gap-3">

                            <button
                                onClick={onClose}
                                className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                            >
                                Done
                            </button>

                            <button
                                onClick={() => {
                                    /*
                                    Closing first isn't necessary.
                                    The parent will recreate the quiz
                                    when clicked again.
                                    */
                                    onClose();
                                }}
                                className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                            >
                                Continue Learning
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


    /*
    =====================================================
    QUIZ SCREEN
    =====================================================
    */

    const selectedAnswer =
        answers[currentQuestion];

    const progress =
        Math.round(
            ((currentQuestion + 1) /
                questions.length) *
            100
        );


    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4 py-6">

            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

                    <div className="flex items-center justify-between gap-4">

                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                                Skill Assessment
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                {skill.name}
                            </h2>

                        </div>


                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                            ✕
                        </button>

                    </div>


                    {/* Progress */}

                    <div className="mt-5">

                        <div className="mb-2 flex items-center justify-between">

                            <span className="text-xs font-semibold text-slate-400">
                                Question {currentQuestion + 1} of{" "}
                                {questions.length}
                            </span>

                            <span className="text-xs font-bold text-indigo-600">
                                {progress}%
                            </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                            <div
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                                style={{
                                    width: `${progress}%`
                                }}
                            />

                        </div>

                    </div>

                </div>


                {/* Question */}

                <div className="overflow-y-auto px-6 py-8 sm:px-10">

                    <div className="mx-auto max-w-2xl">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                            🧠
                        </div>

                        <h3 className="mt-6 text-2xl font-bold leading-9 text-slate-900">
                            {question.question}
                        </h3>


                        <div className="mt-8 space-y-3">

                            {question.options.map(
                                (option, index) => {

                                    const selected =
                                        selectedAnswer ===
                                        option;

                                    return (
                                        <button
                                            key={option}
                                            onClick={() =>
                                                onAnswer(
                                                    option
                                                )
                                            }
                                            className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                                                selected
                                                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                                                    : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50"
                                            }`}
                                        >

                                            <span
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                                                    selected
                                                        ? "bg-indigo-600 text-white"
                                                        : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                                                }`}
                                            >
                                                {String.fromCharCode(
                                                    65 + index
                                                )}
                                            </span>

                                            <span
                                                className={`text-sm font-semibold ${
                                                    selected
                                                        ? "text-indigo-700"
                                                        : "text-slate-700"
                                                }`}
                                            >
                                                {option}
                                            </span>

                                        </button>
                                    );
                                }
                            )}

                        </div>

                    </div>

                </div>


                {/* Footer */}

                <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">

                    <div className="flex items-center justify-between gap-3">

                        <button
                            onClick={onPrevious}
                            disabled={
                                currentQuestion === 0
                            }
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ← Previous
                        </button>


                        {currentQuestion <
                        questions.length - 1 ? (

                            <button
                                onClick={onNext}
                                disabled={!selectedAnswer}
                                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next →
                            </button>

                        ) : (

                            <button
                                onClick={onSubmit}
                                disabled={!selectedAnswer}
                                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Submit Quiz ✓
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}


export default GoalDetails;


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { api } from "../services/api";
// import { getCurrentUserId } from "../config";

// function GoalDetails() {
//     const { goalId } = useParams();
//     const navigate = useNavigate();

//     // Get the currently logged-in/selected user's ID
//     const userId = getCurrentUserId();

//     const [goal, setGoal] = useState(null);
//     const [skillGaps, setSkillGaps] = useState(null);
//     const [learningPath, setLearningPath] = useState(null);

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const loadGoalDetails = async () => {
//             try {
//                 setLoading(true);
//                 setError("");

//                 // Make sure we have a current user
//                 if (!userId) {
//                     setError(
//                         "No user found. Please create an account or log in first."
//                     );
//                     return;
//                 }

//                 const [
//                     goalResponse,
//                     gapResponse,
//                     pathResponse
//                 ] = await Promise.all([
//                     api.getGoal(
//                         userId,
//                         goalId
//                     ),

//                     api.getSkillGaps(
//                         userId,
//                         goalId
//                     ),

//                     api.getLearningPath(
//                         userId,
//                         goalId
//                     )
//                 ]);

//                 setGoal(goalResponse.goal);
//                 setSkillGaps(gapResponse);
//                 setLearningPath(pathResponse);

//             } catch (error) {
//                 console.error(
//                     "Goal details error:",
//                     error
//                 );

//                 setError(
//                     "Unable to load goal analysis."
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadGoalDetails();
//     }, [goalId, userId]);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//                 <div className="text-center">

//                     <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />

//                     <p className="text-slate-600 font-medium">
//                         Analyzing your learning goal...
//                     </p>

//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

//                 <div className="bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm max-w-md">

//                     <h2 className="text-xl font-bold text-slate-900 mb-2">
//                         Something went wrong
//                     </h2>

//                     <p className="text-slate-500 mb-6">
//                         {error}
//                     </p>

//                     <button
//                         onClick={() => navigate("/goals")}
//                         className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//                     >
//                         Back to Goals
//                     </button>

//                 </div>
//             </div>
//         );
//     }

//     if (!goal) {
//         return null;
//     }

//     return (
//         <div className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">

//             <div className="max-w-7xl mx-auto">

//                 {/* Back button */}

//                 <button
//                     onClick={() => navigate("/goals")}
//                     className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition mb-6"
//                 >
//                     ← Back to goals
//                 </button>


//                 {/* =========================================
//                     GOAL HEADER
//                 ========================================== */}

//                 <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

//                     <div className="p-8 lg:p-10">

//                         <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

//                             <div>

//                                 <div className="flex items-center gap-3 mb-4">

//                                     <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide">
//                                         Learning Goal
//                                     </span>

//                                     <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold capitalize">
//                                         {goal.status}
//                                     </span>

//                                 </div>

//                                 <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
//                                     {goal.title}
//                                 </h1>

//                                 <p className="mt-4 text-slate-500 max-w-3xl leading-7">
//                                     {goal.target ||
//                                         "Your personalized learning journey."}
//                                 </p>

//                             </div>


//                             {/* =========================================
//                                 HEADER ACTIONS + STATS
//                             ========================================== */}

//                             <div className="flex flex-col sm:flex-row gap-3">

//                                 {/* Analyze Skill Gaps Button */}

//                                 <button
//                                     onClick={() =>
//                                         navigate(
//                                             `/goals/${goal._id}/skill-gaps`
//                                         )
//                                     }
//                                     className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-sm shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
//                                 >

//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-5 h-5"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                     >

//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
//                                         />

//                                     </svg>

//                                     Analyze Skill Gaps

//                                 </button>


//                                 {/* Existing Skills Card */}

//                                 <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[120px]">

//                                     <p className="text-xs text-slate-400 font-semibold uppercase">
//                                         Skills
//                                     </p>

//                                     <p className="text-2xl font-bold text-slate-900 mt-1">
//                                         {goal.requiredSkills?.length || 0}
//                                     </p>

//                                 </div>


//                                 {/* Existing Weekly Card */}

//                                 <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[120px]">

//                                     <p className="text-xs text-slate-400 font-semibold uppercase">
//                                         Weekly
//                                     </p>

//                                     <p className="text-2xl font-bold text-slate-900 mt-1">

//                                         {goal.weeklyHours || 0}

//                                         <span className="text-sm font-medium text-slate-400 ml-1">
//                                             hrs
//                                         </span>

//                                     </p>

//                                 </div>

//                             </div>

//                         </div>

//                     </div>

//                 </section>


//                 {/* =========================================
//                     OVERVIEW
//                 ========================================== */}

//                 <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

//                     <OverviewCard
//                         title="Required Skills"
//                         value={
//                             goal.requiredSkills?.length || 0
//                         }
//                         description="Skills needed for this goal"
//                     />

//                     <OverviewCard
//                         title="Skill Gaps"
//                         value={
//                             skillGaps?.gaps?.length ||
//                             skillGaps?.skillGaps?.length ||
//                             0
//                         }
//                         description="Areas that need improvement"
//                     />

//                     <OverviewCard
//                         title="Learning Path"
//                         value={
//                             learningPath?.steps?.length ||
//                             learningPath?.path?.length ||
//                             0
//                         }
//                         description="Recommended learning steps"
//                     />

//                 </section>


//                 {/* =========================================
//                     SKILL GAP ANALYSIS
//                 ========================================== */}

//                 <section className="mt-10">

//                     <SectionHeading
//                         eyebrow="ANALYSIS"
//                         title="Skill Gap Analysis"
//                         description="See where your current skills stand compared with what your goal requires."
//                     />

//                     <div className="mt-5 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

//                         {renderSkillGaps(skillGaps)}

//                     </div>

//                 </section>


//                 {/* =========================================
//                     LEARNING PATH
//                 ========================================== */}

//                 <section className="mt-10 pb-12">

//                     <SectionHeading
//                         eyebrow="YOUR PATH"
//                         title="Recommended Learning Path"
//                         description="Follow these steps to move toward your goal."
//                     />

//                     <div className="mt-5">

//                         {renderLearningPath(learningPath)}

//                     </div>

//                 </section>

//             </div>
//         </div>
//     );
// }


// /* =============================================
//    Overview Card
// ============================================= */

// function OverviewCard({
//     title,
//     value,
//     description
// }) {
//     return (
//         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

//             <p className="text-sm font-semibold text-slate-500">
//                 {title}
//             </p>

//             <p className="text-3xl font-bold text-slate-900 mt-2">
//                 {value}
//             </p>

//             <p className="text-sm text-slate-400 mt-1">
//                 {description}
//             </p>

//         </div>
//     );
// }


// /* =============================================
//    Section Heading
// ============================================= */

// function SectionHeading({
//     eyebrow,
//     title,
//     description
// }) {
//     return (
//         <div>

//             <p className="text-xs font-bold tracking-[0.18em] text-indigo-600">
//                 {eyebrow}
//             </p>

//             <h2 className="text-2xl font-bold text-slate-900 mt-2">
//                 {title}
//             </h2>

//             <p className="text-slate-500 mt-1">
//                 {description}
//             </p>

//         </div>
//     );
// }


// /* =============================================
//    Skill Gaps
// ============================================= */

// function renderSkillGaps(data) {

//     const gaps =
//         data?.gaps ||
//         data?.skillGaps ||
//         [];

//     if (!gaps.length) {
//         return (
//             <div className="p-10 text-center">

//                 <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">
//                     ✓
//                 </div>

//                 <h3 className="mt-4 text-lg font-bold text-slate-900">
//                     No skill gaps found
//                 </h3>

//                 <p className="text-slate-500 mt-1">
//                     You're currently meeting the required skill levels.
//                 </p>

//             </div>
//         );
//     }

//     return (
//         <div className="divide-y divide-slate-100">

//             {gaps.map((gap, index) => {

//                 const skillName =
//                     gap.skill?.name ||
//                     gap.skillName ||
//                     gap.name ||
//                     `Skill ${index + 1}`;

//                 const current =
//                     gap.currentLevel ??
//                     gap.currentMastery ??
//                     gap.mastery ??
//                     0;

//                 const required =
//                     gap.requiredLevel ??
//                     gap.targetLevel ??
//                     1;

//                 const gapValue =
//                     gap.gap ??
//                     Math.max(
//                         required - current,
//                         0
//                     );

//                 return (
//                     <div
//                         key={gap._id || index}
//                         className="p-6"
//                     >

//                         <div className="flex justify-between items-center gap-4">

//                             <div>

//                                 <h3 className="font-bold text-slate-900">
//                                     {skillName}
//                                 </h3>

//                                 <p className="text-sm text-slate-400 mt-1">
//                                     Current:{" "}
//                                     {Math.round(current * 100)}%
//                                     {" • "}
//                                     Required:{" "}
//                                     {Math.round(required * 100)}%
//                                 </p>

//                             </div>

//                             <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-bold">
//                                 {Math.round(gapValue * 100)}% gap
//                             </span>

//                         </div>


//                         <div className="mt-4">

//                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

//                                 <div
//                                     className="h-full bg-indigo-600 rounded-full transition-all"
//                                     style={{
//                                         width: `${Math.min(
//                                             current * 100,
//                                             100
//                                         )}%`
//                                     }}
//                                 />

//                             </div>

//                         </div>

//                     </div>
//                 );
//             })}

//         </div>
//     );
// }


// /* =============================================
//    Learning Path
// ============================================= */

// function renderLearningPath(data) {

//     const steps =
//         data?.steps ||
//         data?.path ||
//         data?.learningPath ||
//         [];

//     if (!steps.length) {
//         return (
//             <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center">

//                 <h3 className="font-bold text-slate-900">
//                     Learning path is not available yet
//                 </h3>

//                 <p className="text-slate-500 mt-2">
//                     Complete your skill analysis first.
//                 </p>

//             </div>
//         );
//     }

//     return (
//         <div className="space-y-4">

//             {steps.map((step, index) => {

//                 const title =
//                     step.skill?.name ||
//                     step.skillName ||
//                     step.title ||
//                     step.name ||
//                     `Learning Step ${index + 1}`;

//                 const description =
//                     step.description ||
//                     step.reason ||
//                     "Build your knowledge and practical ability in this area.";

//                 return (
//                     <div
//                         key={step._id || index}
//                         className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
//                     >

//                         <div className="flex gap-5">

//                             <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
//                                 {index + 1}
//                             </div>

//                             <div className="flex-1">

//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

//                                     <h3 className="font-bold text-lg text-slate-900">
//                                         {title}
//                                     </h3>

//                                     {step.estimatedHours && (
//                                         <span className="text-sm text-slate-400">
//                                             {step.estimatedHours} hrs
//                                         </span>
//                                     )}

//                                 </div>

//                                 <p className="text-slate-500 text-sm mt-2 leading-6">
//                                     {description}
//                                 </p>

//                             </div>

//                         </div>

//                     </div>
//                 );
//             })}

//         </div>
//     );
// }


// export default GoalDetails;