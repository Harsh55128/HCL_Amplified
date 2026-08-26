const Goal = require("../models/Goal");
const User = require("../models/User");
const Skill = require("../models/Skill");
const {
    analyzeGoal
} = require("../services/llm/goalAnalyzer");

const {
    resolveSkills
} = require("../services/skillResolution/skillResolution.service");


// --------------------------------------------------
// Create Goal
// --------------------------------------------------

const createGoal = async (req, res) => {

    try {

        const { userId } = req.params;

        let {
            title,
            target,
            deadline,
            weeklyHours,
            requiredSkills
        } = req.body;


        // --------------------------------------------------
        // Check user
        // --------------------------------------------------

        const user =
            await User.findById(userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        // --------------------------------------------------
        // Validate title
        // --------------------------------------------------

        if (!title) {

            return res.status(400).json({
                success: false,
                message: "Goal title is required"
            });
        }


        // --------------------------------------------------
        // LLM-powered goal analysis
        // --------------------------------------------------

        let llmAnalysis = null;
        let unresolvedSkills = [];


        /*
         * If the client did not provide requiredSkills,
         * Gemini will analyze the goal.
         */

        if (
            requiredSkills === undefined ||
            requiredSkills.length === 0
        ) {

            console.log(
                "Analyzing goal with Gemini..."
            );


            llmAnalysis =
                await analyzeGoal(title);


            console.log(
                "Gemini analysis:",
                JSON.stringify(
                    llmAnalysis,
                    null,
                    2
                )
            );


            // ----------------------------------------------
            // Resolve Gemini skill names
            // ----------------------------------------------

            const skillNames =
                (llmAnalysis.skills || [])
                    .map(skill => ({
                        name: skill.name
                    }));


            const resolutionResults =
                await resolveSkills(skillNames);


            // ----------------------------------------------
            // Convert resolved skills into Goal format
            // ----------------------------------------------

            requiredSkills = [];


            for (
                const result
                of resolutionResults
            ) {

                if (!result.matched) {

                    unresolvedSkills.push({
                        name: result.input,
                        confidence: result.confidence
                    });

                    continue;
                }


                const originalSkill =
                    (llmAnalysis.skills || [])
                        .find(
                            skill =>
                                skill.name === result.input
                        );


                requiredSkills.push({

                    skillId:
                        result.skill._id,

                    requiredLevel:
                        originalSkill?.requiredLevel ??
                        0.7,

                    importance:
                        originalSkill?.importance ??
                        result.skill.importance ??
                        0.5
                });
            }


            // Use Gemini's title if available.
            if (llmAnalysis.goalTitle) {

                title =
                    llmAnalysis.goalTitle;
            }


            // Use Gemini description as target
            // only when target wasn't supplied.

            if (
                !target &&
                llmAnalysis.description
            ) {

                target =
                    llmAnalysis.description;
            }
        }


        // --------------------------------------------------
        // Validate required skills
        // --------------------------------------------------

        if (!Array.isArray(requiredSkills)) {

            return res.status(400).json({
                success: false,
                message:
                    "requiredSkills must be an array"
            });
        }


        for (
            const item
            of requiredSkills
        ) {

            if (!item.skillId) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Each required skill must contain skillId"
                });
            }


            const skill =
                await Skill.findById(
                    item.skillId
                );


            if (!skill) {

                return res.status(404).json({
                    success: false,
                    message:
                        `Skill not found: ${item.skillId}`
                });
            }


            if (
                item.requiredLevel === undefined ||
                item.requiredLevel < 0 ||
                item.requiredLevel > 1
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "requiredLevel must be between 0 and 1"
                });
            }


            if (
                item.importance !== undefined &&
                (
                    item.importance < 0 ||
                    item.importance > 1
                )
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "importance must be between 0 and 1"
                });
            }
        }


        // --------------------------------------------------
        // Create goal
        // --------------------------------------------------

        const goal =
            await Goal.create({

                userId,

                title,

                target,

                deadline,

                weeklyHours,

                requiredSkills

            });


        // --------------------------------------------------
        // Populate skills
        // --------------------------------------------------

        const populatedGoal =
            await Goal.findById(
                goal._id
            )
            .populate(
                "requiredSkills.skillId"
            );


        // --------------------------------------------------
        // Response
        // --------------------------------------------------

        res.status(201).json({

            success: true,

            message:
                "Goal created successfully",

            goal: populatedGoal,

            llmAnalysis,

            unresolvedSkills

        });

    } catch (error) {

        console.error(
            "Create goal error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to create goal",

            error:
                error.message

        });
    }
};


// --------------------------------------------------
// Get all goals of a user
// --------------------------------------------------

const getUserGoals = async (req, res) => {
    try {

        const { userId } = req.params;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        const goals = await Goal.find({
            userId
        })
        .populate("requiredSkills.skillId")
        .sort({
            createdAt: -1
        });


        res.status(200).json({
            success: true,
            count: goals.length,
            goals
        });

    } catch (error) {

        console.error("Get goals error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch goals"
        });
    }
};


// --------------------------------------------------
// Get single goal
// --------------------------------------------------

const getGoal = async (req, res) => {
    try {

        const { userId, goalId } = req.params;


        const goal = await Goal.findOne({
            _id: goalId,
            userId
        }).populate("requiredSkills.skillId");


        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }


        res.status(200).json({
            success: true,
            goal
        });

    } catch (error) {

        console.error("Get goal error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch goal"
        });
    }
};


module.exports = {
    createGoal,
    getUserGoals,
    getGoal
};