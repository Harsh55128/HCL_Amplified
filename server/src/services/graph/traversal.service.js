const SkillRelationship = require("../../models/SkillRelationship");

const getAllPrerequisites = async (skillId) => {
    const visited = new Set();
    const result = [];

    const traverse = async (currentSkillId) => {
        const relationships = await SkillRelationship.find({
            targetSkillId: currentSkillId,
            type: "prerequisite"
        }).populate("sourceSkillId", "name slug");

        for (const relationship of relationships) {
            const prerequisiteId =
                relationship.sourceSkillId._id.toString();

            if (visited.has(prerequisiteId)) {
                continue;
            }

            visited.add(prerequisiteId);

            result.push({
                skillId: relationship.sourceSkillId._id,
                name: relationship.sourceSkillId.name,
                slug: relationship.sourceSkillId.slug,
                minimumMastery: relationship.minimumMastery
            });

            await traverse(prerequisiteId);
        }
    };

    await traverse(skillId);

    return result;
};

module.exports = {
    getAllPrerequisites
};