const Skill = require("../../models/Skill");


/**
 * Normalize a skill name so that small formatting
 * differences don't cause duplicate matches.
 */
const normalizeSkillName = (value) => {
    if (!value) return "";

    return value
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[._-]+/g, " ")
        .replace(/\s+/g, " ");
};


/**
 * Create a slug-like representation.
 */
const toSlug = (value) => {
    return normalizeSkillName(value)
        .replace(/\s+/g, "-");
};


/**
 * Calculate a simple similarity score between two strings.
 *
 * This is intentionally lightweight for now.
 * Later we can replace this with embeddings.
 */
const similarityScore = (a, b) => {

    const first = normalizeSkillName(a);
    const second = normalizeSkillName(b);

    if (!first || !second) {
        return 0;
    }

    if (first === second) {
        return 1;
    }

    const firstWords = new Set(first.split(" "));
    const secondWords = new Set(second.split(" "));

    let intersection = 0;

    firstWords.forEach((word) => {
        if (secondWords.has(word)) {
            intersection++;
        }
    });

    const union =
        new Set([
            ...firstWords,
            ...secondWords
        ]).size;

    if (union === 0) {
        return 0;
    }

    return intersection / union;
};


/**
 * Resolve one LLM-generated skill against
 * the skills already stored in MongoDB.
 */
const resolveSkill = async (skillInput) => {

    const skillName =
        typeof skillInput === "string"
            ? skillInput
            : skillInput.name;

    if (!skillName) {
        return {
            input: skillInput,
            matched: false,
            skill: null,
            confidence: 0
        };
    }


    const normalized =
        normalizeSkillName(skillName);

    const slug =
        toSlug(skillName);


    // --------------------------------------------------
    // 1. Exact slug match
    // --------------------------------------------------

    let skill =
        await Skill.findOne({
            slug: slug
        });


    if (skill) {

        return {
            input: skillName,
            matched: true,
            skill,
            confidence: 1,
            matchType: "exact-slug"
        };
    }


    // --------------------------------------------------
    // 2. Exact name match (case insensitive)
    // --------------------------------------------------

    skill =
        await Skill.findOne({
            name: {
                $regex: `^${normalized}$`,
                $options: "i"
            }
        });


    if (skill) {

        return {
            input: skillName,
            matched: true,
            skill,
            confidence: 1,
            matchType: "exact-name"
        };
    }


    // --------------------------------------------------
    // 3. Alias matching
    //
    // This works if your Skill schema contains
    // an "aliases" field.
    // --------------------------------------------------

    if (
        Skill.schema.path("aliases")
    ) {

        skill =
            await Skill.findOne({
                aliases: {
                    $regex: `^${normalized}$`,
                    $options: "i"
                }
            });


        if (skill) {

            return {
                input: skillName,
                matched: true,
                skill,
                confidence: 0.95,
                matchType: "alias"
            };
        }
    }


    // --------------------------------------------------
    // 4. Lightweight similarity matching
    // --------------------------------------------------

    const skills =
        await Skill.find({})
            .select("name slug aliases");


    let bestMatch = null;
    let bestScore = 0;


    for (const candidate of skills) {

        const score =
            similarityScore(
                skillName,
                candidate.name
            );


        if (score > bestScore) {

            bestScore = score;
            bestMatch = candidate;
        }


        // Also compare aliases if available.
        if (candidate.aliases) {

            for (
                const alias
                of candidate.aliases
            ) {

                const aliasScore =
                    similarityScore(
                        skillName,
                        alias
                    );


                if (
                    aliasScore >
                    bestScore
                ) {

                    bestScore =
                        aliasScore;

                    bestMatch =
                        candidate;
                }
            }
        }
    }


    // Don't make dangerous automatic matches.
    // 0.8 is our initial confidence threshold.
    if (
        bestMatch &&
        bestScore >= 0.8
    ) {

        return {
            input: skillName,
            matched: true,
            skill: bestMatch,
            confidence: bestScore,
            matchType: "similarity"
        };
    }


    // --------------------------------------------------
    // 5. Unknown skill
    // --------------------------------------------------

    return {
        input: skillName,
        matched: false,
        skill: null,
        confidence: bestScore,
        matchType: "unresolved"
    };
};


/**
 * Resolve a complete list of skills returned by Gemini.
 */
const resolveSkills = async (skills) => {

    if (!Array.isArray(skills)) {
        throw new Error(
            "skills must be an array"
        );
    }


    const results = [];

    for (const skill of skills) {

        const result =
            await resolveSkill(skill);

        results.push(result);
    }


    return results;
};


module.exports = {
    normalizeSkillName,
    resolveSkill,
    resolveSkills
};