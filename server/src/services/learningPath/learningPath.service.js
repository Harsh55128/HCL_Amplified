const {
    calculateSkillGaps
} = require("../skillGap/skillGap.service");


// --------------------------------------------------
// Check whether all prerequisites are satisfied
// --------------------------------------------------

const arePrerequisitesSatisfied = (skill) => {

    if (!skill.prerequisites) {
        return true;
    }

    return skill.prerequisites.every(
        (prerequisite) =>
            prerequisite.satisfied === true
    );
};


// --------------------------------------------------
// Generate dependency-aware learning path
// --------------------------------------------------

const generateLearningPath = async (
    userId,
    goalId
) => {

    // ----------------------------------------------
    // 1. Get skill gaps from C4
    // ----------------------------------------------

    const gapResult =
        await calculateSkillGaps(
            userId,
            goalId
        );


    const skillGaps =
        gapResult.skillGaps;


    // ----------------------------------------------
    // 2. Remove completed skills
    // ----------------------------------------------

    const remainingSkills =
        skillGaps.filter(
            (skill) =>
                skill.status !== "completed"
        );


    // ----------------------------------------------
    // 3. Create lookup map
    // ----------------------------------------------

    const skillMap = new Map();


    remainingSkills.forEach((skill) => {

        skillMap.set(
            skill.skillId.toString(),
            skill
        );

    });


    // ----------------------------------------------
    // 4. Learning path
    // ----------------------------------------------

    const learningPath = [];


    // Keep track of skills already selected

    const selectedSkills = new Set();


    // ----------------------------------------------
    // 5. Dynamically select available skills
    // ----------------------------------------------

    while (
        selectedSkills.size <
        remainingSkills.length
    ) {

        const availableSkills =
            remainingSkills.filter(
                (skill) => {

                    // Already selected

                    if (
                        selectedSkills.has(
                            skill.skillId.toString()
                        )
                    ) {
                        return false;
                    }


                    // Check prerequisites

                    return arePrerequisitesSatisfied(
                        skill
                    );

                }
            );


        // ------------------------------------------
        // No available skill
        // ------------------------------------------

        if (availableSkills.length === 0) {

            break;

        }


        // ------------------------------------------
        // Highest priority available skill
        // ------------------------------------------

        availableSkills.sort(
            (a, b) =>
                b.priorityScore -
                a.priorityScore
        );


        const selected =
            availableSkills[0];


        // ------------------------------------------
        // Add to path
        // ------------------------------------------

        learningPath.push({

            position:
                learningPath.length + 1,

            skillId:
                selected.skillId,

            skillName:
                selected.skillName,

            currentMastery:
                selected.currentMastery,

            requiredLevel:
                selected.requiredLevel,

            gap:
                selected.gap,

            importance:
                selected.importance,

            priorityScore:
                selected.priorityScore,

            status:
                "ready",

            prerequisites:
                selected.prerequisites

        });


        // ------------------------------------------
        // Mark as selected
        // ------------------------------------------

        selectedSkills.add(
            selected.skillId.toString()
        );
    }


    // ----------------------------------------------
    // 6. Add skills that remain blocked
    // ----------------------------------------------

    const blockedSkills =
        remainingSkills.filter(
            (skill) =>
                !selectedSkills.has(
                    skill.skillId.toString()
                )
        );


    for (const skill of blockedSkills) {

        learningPath.push({

            position:
                learningPath.length + 1,

            skillId:
                skill.skillId,

            skillName:
                skill.skillName,

            currentMastery:
                skill.currentMastery,

            requiredLevel:
                skill.requiredLevel,

            gap:
                skill.gap,

            importance:
                skill.importance,

            priorityScore:
                0,

            status:
                "blocked",

            prerequisites:
                skill.prerequisites

        });
    }


    // ----------------------------------------------
    // 7. Return result
    // ----------------------------------------------

    return {

        goalId:
            gapResult.goalId,

        goalTitle:
            gapResult.goalTitle,

        learningPath

    };
};


module.exports = {
    generateLearningPath
};