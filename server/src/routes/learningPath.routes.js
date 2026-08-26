const express = require("express");

const {
    getLearningPath
} = require("../controllers/learningPath.controller");


const router =
    express.Router();


router.get(
    "/:userId/:goalId",
    getLearningPath
);


module.exports = router;