const Skill = require("../models/Skill");
const {
    getPrerequisites,
    getDependents
} = require("../services/graph/graph.service");

const {
    getAllPrerequisites
} = require("../services/graph/traversal.service");

const getSkillGraph = async (req, res) => {
    try {
        const skill = await Skill.findOne({
            slug: req.params.slug
        });

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        const prerequisites =
            await getPrerequisites(skill._id);

        const dependents =
            await getDependents(skill._id);

        const allPrerequisites =
            await getAllPrerequisites(skill._id);

        res.json({
            success: true,
            skill: {
                id: skill._id,
                name: skill.name,
                slug: skill.slug
            },
            prerequisites,
            dependents,
            allPrerequisites
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load skill graph"
        });
    }
};

module.exports = {
    getSkillGraph
};