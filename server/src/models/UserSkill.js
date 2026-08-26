const mongoose = require("mongoose");

const userSkillSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        skillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },

        mastery: {
            type: Number,
            min: 0,
            max: 1,
            default: 0
        },

        confidence: {
            type: Number,
            min: 0,
            max: 1,
            default: 0
        },

        source: {
            type: String,
            enum: [
                "self_reported",
                "assessment",
                "behavior",
                "system"
            ],
            default: "system"
        }
    },
    {
        timestamps: true
    }
);

userSkillSchema.index(
    {
        userId: 1,
        skillId: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "UserSkill",
    userSkillSchema
);