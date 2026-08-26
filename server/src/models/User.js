const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        experienceLevel: {
            type: String,
            enum: [
                "beginner",
                "intermediate",
                "advanced"
            ],
            default: "beginner"
        },

        weeklyHours: {
            type: Number,
            min: 0,
            default: 5
        },

        learningStyle: {
            type: String,
            default: "mixed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);