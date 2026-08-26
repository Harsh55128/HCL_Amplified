const User = require("../models/User");

// Create a new learner
const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            experienceLevel,
            weeklyHours,
            learningStyle
        } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            experienceLevel,
            weeklyHours,
            learningStyle
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error("Create user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }
};
// Get user by email
const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email.toLowerCase().trim();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Get user by email error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to find user"
        });
    }
};

// Get user by ID
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Get user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};


module.exports = {
    createUser,
    getUser,
     getUserByEmail
};