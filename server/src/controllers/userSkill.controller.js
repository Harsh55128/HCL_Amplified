const User = require("../models/User");
const Skill = require("../models/Skill");
const UserSkill = require("../models/UserSkill");


// --------------------------------------------------
// Add or update a user's skill
// --------------------------------------------------

const addUserSkill = async (req, res) => {
    try {
        const { userId } = req.params;

        const {
            skillId,
            mastery,
            confidence,
            source
        } = req.body;


        // --------------------------------------------
        // Validate required fields
        // --------------------------------------------

        if (!skillId) {
            return res.status(400).json({
                success: false,
                message: "skillId is required"
            });
        }


        // --------------------------------------------
        // Check if user exists
        // --------------------------------------------

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        // --------------------------------------------
        // Check if skill exists
        // --------------------------------------------

        const skill = await Skill.findById(skillId);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }


        // --------------------------------------------
        // Validate mastery
        // --------------------------------------------

        if (
            mastery !== undefined &&
            (mastery < 0 || mastery > 1)
        ) {
            return res.status(400).json({
                success: false,
                message: "Mastery must be between 0 and 1"
            });
        }


        // --------------------------------------------
        // Validate confidence
        // --------------------------------------------

        if (
            confidence !== undefined &&
            (confidence < 0 || confidence > 1)
        ) {
            return res.status(400).json({
                success: false,
                message: "Confidence must be between 0 and 1"
            });
        }


        // --------------------------------------------
        // Create or update UserSkill
        // --------------------------------------------

        const userSkill = await UserSkill.findOneAndUpdate(
            {
                userId,
                skillId
            },
            {
                mastery: mastery ?? 0,
                confidence: confidence ?? 0,
                source: source ?? "self_reported"
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        ).populate(
            "skillId",
            "name slug domain category difficulty"
        );


        // --------------------------------------------
        // Response
        // --------------------------------------------

        res.status(200).json({
            success: true,
            message: "User skill saved successfully",
            userSkill
        });

    } catch (error) {

        console.error("Add user skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save user skill"
        });
    }
};


// --------------------------------------------------
// Get all skills of a user
// --------------------------------------------------

const getUserSkills = async (req, res) => {
    try {

        const { userId } = req.params;


        // Check user

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        const userSkills = await UserSkill.find({
            userId
        })
        .populate(
            "skillId",
            "name slug domain category difficulty"
        )
        .sort({
            mastery: -1
        });


        res.status(200).json({
            success: true,
            count: userSkills.length,
            skills: userSkills
        });

    } catch (error) {

        console.error("Get user skills error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch user skills"
        });
    }
};


// --------------------------------------------------
// Update a specific user skill
// --------------------------------------------------

const updateUserSkill = async (req, res) => {
    try {

        const {
            userId,
            skillId
        } = req.params;

        const {
            mastery,
            confidence,
            source
        } = req.body;


        // Validate mastery

        if (
            mastery !== undefined &&
            (mastery < 0 || mastery > 1)
        ) {
            return res.status(400).json({
                success: false,
                message: "Mastery must be between 0 and 1"
            });
        }


        // Validate confidence

        if (
            confidence !== undefined &&
            (confidence < 0 || confidence > 1)
        ) {
            return res.status(400).json({
                success: false,
                message: "Confidence must be between 0 and 1"
            });
        }


        const userSkill = await UserSkill.findOneAndUpdate(
            {
                userId,
                skillId
            },
            {
                ...(mastery !== undefined && { mastery }),
                ...(confidence !== undefined && { confidence }),
                ...(source !== undefined && { source })
            },
            {
                new: true,
                runValidators: true
            }
        ).populate(
            "skillId",
            "name slug domain category difficulty"
        );


        if (!userSkill) {
            return res.status(404).json({
                success: false,
                message: "User skill not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "User skill updated successfully",
            userSkill
        });

    } catch (error) {

        console.error("Update user skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update user skill"
        });
    }
};


// --------------------------------------------------
// Delete a user skill
// --------------------------------------------------

const deleteUserSkill = async (req, res) => {
    try {

        const {
            userId,
            skillId
        } = req.params;


        const userSkill = await UserSkill.findOneAndDelete({
            userId,
            skillId
        });


        if (!userSkill) {
            return res.status(404).json({
                success: false,
                message: "User skill not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "User skill deleted successfully"
        });

    } catch (error) {

        console.error("Delete user skill error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user skill"
        });
    }
};


module.exports = {
    addUserSkill,
    getUserSkills,
    updateUserSkill,
    deleteUserSkill
};