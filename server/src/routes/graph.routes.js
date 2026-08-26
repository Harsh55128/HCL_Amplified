const express = require("express");

const {
    getSkillGraph
} = require("../controllers/graph.controller");

const router = express.Router();

router.get(
    "/skills/:slug",
    getSkillGraph
);

module.exports = router;