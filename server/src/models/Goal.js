const mongoose = require("mongoose");

const requiredSkillSchema = new mongoose.Schema(
    {
        skillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },

        requiredLevel: {
            type: Number,
            min: 0,
            max: 1,
            required: true
        },

        importance: {
            type: Number,
            min: 0,
            max: 1,
            default: 0.5
        }
    },
    {
        _id: false
    }
);

const goalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        target: {
            type: String,
            default: ""
        },

        deadline: {
            type: Date
        },

        weeklyHours: {
            type: Number,
            min: 0
        },

        requiredSkills: {
            type: [requiredSkillSchema],
            default: []
        },

        status: {
            type: String,
            enum: ["active", "completed", "paused"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Goal", goalSchema);