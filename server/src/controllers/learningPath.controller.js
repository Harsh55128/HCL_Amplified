const {
    generateLearningPath
} = require("../services/learningPath/learningPath.service");


const getLearningPath = async (req, res) => {

    try {

        const {
            userId,
            goalId
        } = req.params;


        const result =
            await generateLearningPath(
                userId,
                goalId
            );


        res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        console.error(
            "Learning path error:",
            error
        );


        if (
            error.message ===
            "Goal not found"
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Goal not found"

            });

        }


        res.status(500).json({

            success: false,

            message:
                "Failed to generate learning path"

        });

    }
};


module.exports = {
    getLearningPath
};