const express = require("express");

const {
    addUserSkill,
    getUserSkills,
    updateUserSkill,
    deleteUserSkill
} = require("../controllers/userSkill.controller");

const router = express.Router();


// Add or update skill

router.post(
    "/:userId/skills",
    addUserSkill
);


// Get all user skills

router.get(
    "/:userId/skills",
    getUserSkills
);


// Update specific skill

router.put(
    "/:userId/skills/:skillId",
    updateUserSkill
);


// Delete specific skill

router.delete(
    "/:userId/skills/:skillId",
    deleteUserSkill
);


module.exports = router;