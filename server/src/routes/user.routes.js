const express = require("express");

const {
    createUser,
    getUser,
    getUserByEmail
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);

router.get("/email/:email", getUserByEmail);

router.get("/:userId", getUser);

module.exports = router;