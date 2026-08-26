const {
    generateText
} = require("./llm.service");


// --------------------------------------------------
// Analyze a natural-language learning goal
// --------------------------------------------------

const analyzeGoal = async (goalDescription) => {

    const systemPrompt = `
You are an intelligent learning-goal analysis engine.

Your job is to convert a user's natural-language learning
goal into a structured learning plan.

The goal can belong to ANY technical or academic domain.

Examples include:

- Artificial Intelligence
- Machine Learning
- Data Science
- Blockchain
- Cybersecurity
- Cloud Computing
- Web Development
- Programming
- Mathematics
- DevOps
- Mobile Development
- Computer Science
- Any other domain


==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.

The JSON must have exactly this structure:

{
    "goalTitle": "...",
    "domain": "...",
    "description": "...",
    "skills": [
        {
            "name": "...",
            "importance": 0.0,
            "requiredLevel": 0.0
        }
    ]
}


==================================================
SKILL RULES
==================================================

1. Every skill must be an ATOMIC and CONCRETE skill.

A skill should represent something that can independently
exist as a node in a knowledge graph.


2. DO NOT return skill categories.

BAD:
"Frontend Development"

GOOD:
"HTML"
"CSS"
"JavaScript"


3. DO NOT combine multiple skills into one skill.

BAD:
"HTML/CSS"

GOOD:
"HTML"
"CSS"


BAD:
"REST APIs & GraphQL"

GOOD:
"REST API"


4. DO NOT provide alternatives inside a skill name.

BAD:
"Frontend Framework (React/Vue/Angular)"

GOOD:
"React"


BAD:
"Backend Programming (Node.js/Python/Java)"

GOOD:
"Node.js"


BAD:
"Database (SQL/NoSQL)"

GOOD:
"MongoDB"


5. Prefer a specific, widely recognized technology or
knowledge concept when the goal implies one.

For example, for:

"I want to become a full stack developer"

prefer:

HTML
CSS
JavaScript
React
Node.js
Express.js
REST API
MongoDB
Authentication
Deployment


6. Include prerequisite skills.

For example, if the goal requires React, include
JavaScript when appropriate.

If the goal requires Machine Learning, include
Python and relevant mathematical foundations when
appropriate.


7. Do not invent obscure or unnecessary skills.

Only include skills that materially contribute to
achieving the user's goal.


8. Skills must be independent.

Each item in the skills array should represent ONE
learning topic.


9. "importance" must be a number between 0 and 1.

Higher value means the skill is more important for
achieving the goal.


10. "requiredLevel" must be a number between 0 and 1.

Interpretation:

0.0 = no knowledge required
0.25 = basic knowledge
0.5 = intermediate knowledge
0.75 = strong working knowledge
1.0 = advanced/expert knowledge


11. Do NOT assume the user wants to become a Full Stack
Developer.

Analyze the actual goal provided by the user.


12. Do not restrict the number of skills to a fixed number.

Return the skills that are genuinely required.

Avoid unnecessary skills.


13. Use commonly recognized names.

Examples:

"JavaScript"
"Python"
"React"
"Node.js"
"Machine Learning"
"Linear Algebra"
"Statistics"
"SQL"
"MongoDB"
"Docker"


14. Do not include explanations, markdown, comments,
or additional fields outside the JSON.


==================================================
QUALITY CHECK BEFORE RESPONDING
==================================================

Before returning the JSON, verify:

- Every skill is atomic.
- No skill contains "/" alternatives.
- No skill contains parentheses with alternatives.
- No skill combines multiple technologies.
- Skills are relevant to the goal.
- Prerequisites are included where appropriate.
- importance is between 0 and 1.
- requiredLevel is between 0 and 1.
- The response is valid JSON.
- Nothing exists outside the JSON.
`;


    const userPrompt = `
Analyze this learning goal:

"${goalDescription}"
`;


    const result = await generateText({
        systemPrompt,
        userPrompt
    });


    try {

        // ------------------------------------------
        // Remove accidental markdown fences
        // ------------------------------------------

        let cleanedResult =
            result.trim();

        if (
            cleanedResult.startsWith("```")
        ) {

            cleanedResult =
                cleanedResult
                    .replace(/^```json\s*/i, "")
                    .replace(/^```\s*/i, "")
                    .replace(/\s*```$/i, "")
                    .trim();
        }


        // ------------------------------------------
        // Parse JSON
        // ------------------------------------------

        const parsed =
            JSON.parse(cleanedResult);


        // ------------------------------------------
        // Basic validation
        // ------------------------------------------

        if (
            !parsed.goalTitle ||
            !parsed.domain ||
            !Array.isArray(parsed.skills)
        ) {

            throw new Error(
                "Invalid goal structure"
            );
        }


        // ------------------------------------------
        // Validate skills
        // ------------------------------------------

        for (
            const skill
            of parsed.skills
        ) {

            if (!skill.name) {

                throw new Error(
                    "Skill name is missing"
                );
            }


            if (
                typeof skill.importance !== "number" ||
                skill.importance < 0 ||
                skill.importance > 1
            ) {

                throw new Error(
                    `Invalid importance for skill: ${skill.name}`
                );
            }


            if (
                typeof skill.requiredLevel !== "number" ||
                skill.requiredLevel < 0 ||
                skill.requiredLevel > 1
            ) {

                throw new Error(
                    `Invalid requiredLevel for skill: ${skill.name}`
                );
            }
        }


        return parsed;

    } catch (error) {

        console.error(
            "Invalid LLM JSON:",
            result
        );

        console.error(
            "Parsing/validation error:",
            error.message
        );

        throw new Error(
            "LLM returned invalid goal structure"
        );
    }
};


module.exports = {
    analyzeGoal
};