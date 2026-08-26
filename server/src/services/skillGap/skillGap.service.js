const Goal = require("../../models/Goal");
const UserSkill = require("../../models/UserSkill");
const SkillRelationship = require("../../models/SkillRelationship");


// --------------------------------------------------
// Get prerequisites of a skill
// --------------------------------------------------

const getPrerequisites = async (skillId) => {

    const relationships = await SkillRelationship.find({
        targetSkillId: skillId,
        type: "prerequisite"
    }).populate(
        "sourceSkillId",
        "name slug"
    );

    return relationships.map((relationship) => ({
        skillId: relationship.sourceSkillId._id,
        skillName: relationship.sourceSkillId.name,
        slug: relationship.sourceSkillId.slug,
        minimumMastery: relationship.minimumMastery ?? 0
    }));
};


// --------------------------------------------------
// Calculate basic priority
// --------------------------------------------------

const calculatePriority = (gap, importance) => {
    return gap * importance;
};


// --------------------------------------------------
// Calculate prerequisite-aware priority
// --------------------------------------------------

const calculatePrerequisiteState = (
    prerequisites,
    userSkillMap
) => {

    let blocked = false;

    const prerequisiteDetails = [];


    for (const prerequisite of prerequisites) {

        const prerequisiteId =
            prerequisite.skillId.toString();


        const userSkill =
            userSkillMap.get(prerequisiteId);


        const currentMastery =
            userSkill
                ? userSkill.mastery
                : 0;


        const minimumMastery =
            prerequisite.minimumMastery;


        const prerequisiteGap =
            Math.max(
                0,
                minimumMastery - currentMastery
            );


        const satisfied =
            currentMastery >= minimumMastery;


        if (!satisfied) {
            blocked = true;
        }


        prerequisiteDetails.push({

            skillId:
                prerequisite.skillId,

            skillName:
                prerequisite.skillName,

            slug:
                prerequisite.slug,

            currentMastery,

            minimumMastery,

            gap:
                prerequisiteGap,

            satisfied

        });
    }


    return {
        blocked,
        prerequisites: prerequisiteDetails
    };
};


// --------------------------------------------------
// Main Skill Gap Engine
// --------------------------------------------------

const calculateSkillGaps = async (
    userId,
    goalId
) => {

    // ----------------------------------------------
    // 1. Get goal
    // ----------------------------------------------

    const goal = await Goal.findOne({
        _id: goalId,
        userId
    }).populate(
        "requiredSkills.skillId"
    );


    if (!goal) {
        throw new Error("Goal not found");
    }


    // ----------------------------------------------
    // 2. Get user's current skills
    // ----------------------------------------------

    const userSkills =
        await UserSkill.find({
            userId
        });


    // ----------------------------------------------
    // 3. Create mastery lookup map
    // ----------------------------------------------

    const userSkillMap = new Map();


    userSkills.forEach((userSkill) => {

        userSkillMap.set(
            userSkill.skillId.toString(),
            userSkill
        );

    });


    // ----------------------------------------------
    // 4. Calculate gaps
    // ----------------------------------------------

    const skillGaps = [];


    for (
        const requiredSkill
        of goal.requiredSkills
    ) {

        const skill =
            requiredSkill.skillId;


        const skillId =
            skill._id.toString();


        const requiredLevel =
            requiredSkill.requiredLevel;


        const importance =
            requiredSkill.importance;


        // ------------------------------------------
        // Current mastery
        // ------------------------------------------

        const userSkill =
            userSkillMap.get(skillId);


        const currentMastery =
            userSkill
                ? userSkill.mastery
                : 0;


        // ------------------------------------------
        // Basic gap
        // ------------------------------------------

        const gap =
            Math.max(
                0,
                requiredLevel -
                currentMastery
            );


        // ------------------------------------------
        // Basic status
        // ------------------------------------------

        const status =
            gap === 0
                ? "completed"
                : "needs_learning";


        // ------------------------------------------
        // Get prerequisites
        // ------------------------------------------

        const prerequisites =
            await getPrerequisites(
                skill._id
            );


        // ------------------------------------------
        // Check prerequisite state
        // ------------------------------------------

        const prerequisiteState =
            calculatePrerequisiteState(
                prerequisites,
                userSkillMap
            );


        // ------------------------------------------
        // Basic priority
        // ------------------------------------------

        let priorityScore =
            calculatePriority(
                gap,
                importance
            );


        // ------------------------------------------
        // If prerequisite is missing,
        // block this skill.
        // ------------------------------------------

        let finalStatus = status;


        if (status === "needs_learning") {

            if (prerequisiteState.blocked) {

                finalStatus = "blocked";

            }
        }


        // ------------------------------------------
        // Blocked skills get lower priority.
        // ------------------------------------------

        if (finalStatus === "blocked") {

            priorityScore =
                priorityScore * 0.5;

        }


        skillGaps.push({

            skillId:
                skill._id,

            skillName:
                skill.name,

            slug:
                skill.slug,

            currentMastery,

            requiredLevel,

            gap,

            importance,

            priorityScore,

            status:
                finalStatus,

            prerequisites:
                prerequisiteState.prerequisites

        });
    }


    // ----------------------------------------------
    // 5. Sort by priority
    // ----------------------------------------------

    skillGaps.sort(
        (a, b) =>
            b.priorityScore -
            a.priorityScore
    );


    return {

        goalId:
            goal._id,

        goalTitle:
            goal.title,

        skillGaps

    };
};


module.exports = {
    calculateSkillGaps
};