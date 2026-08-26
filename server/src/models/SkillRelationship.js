const mongoose = require("mongoose");

const skillRelationshipSchema = new mongoose.Schema(
    {
        sourceSkillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },

        targetSkillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },

        type: {
            type: String,
            enum: [
                "prerequisite",
                "related_to",
                "part_of",
                "similar_to",
                "used_in"
            ],
            required: true
        },

        weight: {
            type: Number,
            min: 0,
            max: 1,
            default: 1
        },

        minimumMastery: {
            type: Number,
            min: 0,
            max: 1,
            default: 0.7
        }
    },
    {
        timestamps: true
    }
);

skillRelationshipSchema.index({
    sourceSkillId: 1,
    targetSkillId: 1,
    type: 1
});

module.exports = mongoose.model(
    "SkillRelationship",
    skillRelationshipSchema
);