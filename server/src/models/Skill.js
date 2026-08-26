const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        description: {
            type: String,
            default: ""
        },

        domain: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        difficulty: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner"
        },

        importance: {
            type: Number,
            min: 0,
            max: 1,
            default: 0.5
        },

        estimatedHours: {
            type: Number,
            min: 0,
            default: 1
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Skill", skillSchema);