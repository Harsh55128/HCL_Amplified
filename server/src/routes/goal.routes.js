const express = require("express");

const {
    createGoal,
    getUserGoals,
    getGoal
} = require("../controllers/goal.controller");

const router = express.Router();


// Create goal

router.post(
    "/:userId",
    createGoal
);


// Get all goals

router.get(
    "/:userId",
    getUserGoals
);


// Get single goal

router.get(
    "/:userId/:goalId",
    getGoal
);


module.exports = router;