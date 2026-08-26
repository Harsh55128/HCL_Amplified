const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const graphRoutes = require("./routes/graph.routes");
const userRoutes = require("./routes/user.routes");
const userSkillRoutes = require("./routes/userSkill.routes");
const goalRoutes = require("./routes/goal.routes");
const skillGapRoutes =require("./routes/skillGap.routes");
const learningPathRoutes =
    require("./routes/learningPath.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/graph", graphRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", userSkillRoutes);
app.use("/api/goals", goalRoutes);
app.use(
    "/api/skill-gaps",
    skillGapRoutes
);
app.use(
    "/api/learning-path",
    learningPathRoutes
);

module.exports = app;