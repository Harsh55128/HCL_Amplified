const SkillRelationship = require("../../models/SkillRelationship");

const getPrerequisites = async (skillId) => {
    const relationships = await SkillRelationship.find({
        targetSkillId: skillId,
        type: "prerequisite"
    }).populate("sourceSkillId", "name slug");

    return relationships;
};

const getDependents = async (skillId) => {
    const relationships = await SkillRelationship.find({
        sourceSkillId: skillId,
        type: "prerequisite"
    }).populate("targetSkillId", "name slug");

    return relationships;
};

module.exports = {
    getPrerequisites,
    getDependents
};