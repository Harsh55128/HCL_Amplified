require("dotenv").config();

const connectDB = require("../config/db");
const seedSkills = require("./skills.seed");

const run = async () => {
    await connectDB();
    await seedSkills();
};

run();