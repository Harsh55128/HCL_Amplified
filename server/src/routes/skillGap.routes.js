const express = require("express");

const {
    getSkillGaps
} = require("../controllers/skillGap.controller");


const router =
    express.Router();


router.get(
    "/:userId/:goalId",
    getSkillGaps
);


module.exports = router;