const API_BASE_URL = "http://localhost:5000/api";

export const api = {

    // --------------------------------------------------
    // USER
    // --------------------------------------------------

    // Get user by ID
    getUser: async (userId) => {

        const response = await fetch(
            `${API_BASE_URL}/users/${userId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return response.json();
    },


    // Check whether a user exists by email
    getUserByEmail: async (email) => {

        const response = await fetch(
            `${API_BASE_URL}/users/email/${encodeURIComponent(email)}`
        );

        // 404 simply means this is a new user
        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error(
                "Failed to check existing user"
            );
        }

        return response.json();
    },


    // Create a new user
    createUser: async (data) => {

        const response = await fetch(
            `${API_BASE_URL}/users`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to create user"
            );
        }

        return result;
    },


    // --------------------------------------------------
    // GOALS
    // --------------------------------------------------

    // Get all goals of a user
    getGoals: async (userId) => {

        const response = await fetch(
            `${API_BASE_URL}/goals/${userId}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch goals"
            );
        }

        return response.json();
    },


    // Get a single goal
    getGoal: async (userId, goalId) => {

        const response = await fetch(
            `${API_BASE_URL}/goals/${userId}/${goalId}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch goal"
            );
        }

        return response.json();
    },


    // Create a goal
    createGoal: async (userId, data) => {

        const response = await fetch(
            `${API_BASE_URL}/goals/${userId}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to create goal"
            );
        }

        return result;
    },


    // --------------------------------------------------
    // USER SKILLS
    // --------------------------------------------------

    // Get all skills of a user
    getSkills: async (userId) => {

        const response = await fetch(
            `${API_BASE_URL}/users/${userId}/skills`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch skills"
            );
        }

        return response.json();
    },


    // --------------------------------------------------
    // SKILL GAP ANALYSIS
    // --------------------------------------------------

    getSkillGaps: async (userId, goalId) => {

        const response = await fetch(
            `${API_BASE_URL}/skill-gaps/${userId}/${goalId}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch skill gaps"
            );
        }

        return response.json();
    },


    // --------------------------------------------------
    // LEARNING PATH
    // --------------------------------------------------

    getLearningPath: async (userId, goalId) => {

        const response = await fetch(
            `${API_BASE_URL}/learning-path/${userId}/${goalId}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch learning path"
            );
        }

        return response.json();
    }

};