const mongoose = require("mongoose");
const Skill = require("../models/Skill");
const SkillRelationship = require("../models/SkillRelationship");

const skills = [
    {
        name: "HTML",
        slug: "html",
        description: "Structure of web pages",
        domain: "Web Development",
        category: "Frontend",
        difficulty: "beginner",
        importance: 0.8,
        estimatedHours: 10
    },

    {
        name: "CSS",
        slug: "css",
        description: "Styling and layout for web pages",
        domain: "Web Development",
        category: "Frontend",
        difficulty: "beginner",
        importance: 0.8,
        estimatedHours: 15
    },

    {
        name: "JavaScript",
        slug: "javascript",
        description: "Programming language for web development",
        domain: "Web Development",
        category: "Programming",
        difficulty: "beginner",
        importance: 1.0,
        estimatedHours: 40
    },

    {
        name: "React",
        slug: "react",
        description: "Library for building user interfaces",
        domain: "Web Development",
        category: "Frontend",
        difficulty: "intermediate",
        importance: 0.9,
        estimatedHours: 30
    },

    {
        name: "React Hooks",
        slug: "react-hooks",
        description: "React hooks for state and lifecycle management",
        domain: "Web Development",
        category: "Frontend",
        difficulty: "intermediate",
        importance: 0.8,
        estimatedHours: 15
    },

    {
        name: "Node.js",
        slug: "node-js",
        description: "JavaScript runtime for backend development",
        domain: "Web Development",
        category: "Backend",
        difficulty: "intermediate",
        importance: 0.9,
        estimatedHours: 25
    },

    {
        name: "Express.js",
        slug: "express-js",
        description: "Backend framework for Node.js",
        domain: "Web Development",
        category: "Backend",
        difficulty: "intermediate",
        importance: 0.8,
        estimatedHours: 15
    },

    {
        name: "REST API",
        slug: "rest-api",
        description: "Architecture for web APIs",
        domain: "Web Development",
        category: "Backend",
        difficulty: "intermediate",
        importance: 0.8,
        estimatedHours: 15
    },

    {
        name: "MongoDB",
        slug: "mongodb",
        description: "NoSQL document database",
        domain: "Web Development",
        category: "Database",
        difficulty: "intermediate",
        importance: 0.8,
        estimatedHours: 20
    },

    {
        name: "Authentication",
        slug: "authentication",
        description: "Identity verification in applications",
        domain: "Web Development",
        category: "Backend",
        difficulty: "intermediate",
        importance: 0.8,
        estimatedHours: 15
    },

    {
        name: "Deployment",
        slug: "deployment",
        description: "Deploying applications to production",
        domain: "Web Development",
        category: "DevOps",
        difficulty: "intermediate",
        importance: 0.7,
        estimatedHours: 15
    },

    {
        name: "Full Stack Project",
        slug: "full-stack-project",
        description: "Build a complete full stack application",
        domain: "Web Development",
        category: "Project",
        difficulty: "advanced",
        importance: 1.0,
        estimatedHours: 40
    }
];

const relationships = [
    ["HTML", "CSS"],
    ["JavaScript", "React"],
    ["React", "React Hooks"],
    ["JavaScript", "Node.js"],
    ["Node.js", "Express.js"],
    ["Express.js", "REST API"],
    ["REST API", "Authentication"],
    ["JavaScript", "MongoDB"],
    ["MongoDB", "Deployment"],
    ["Authentication", "Deployment"],
    ["React Hooks", "Full Stack Project"],
    ["Authentication", "Full Stack Project"],
    ["Deployment", "Full Stack Project"]
];

const seedSkills = async () => {
    try {
        await SkillRelationship.deleteMany({});
        await Skill.deleteMany({});

        const createdSkills = await Skill.insertMany(skills);

        const skillMap = {};

        createdSkills.forEach((skill) => {
            skillMap[skill.name] = skill._id;
        });

        const relationshipDocuments = relationships.map(
            ([source, target]) => ({
                sourceSkillId: skillMap[source],
                targetSkillId: skillMap[target],
                type: "prerequisite",
                weight: 1,
                minimumMastery: 0.7
            })
        );

        await SkillRelationship.insertMany(
            relationshipDocuments
        );

        console.log("Skills and relationships seeded successfully.");

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
};

module.exports = seedSkills;