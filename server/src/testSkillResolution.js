require("dotenv").config();

const connectDB = require("./config/db");
const {
    resolveSkills
} = require("./services/skillResolution/skillResolution.service");


const test = async () => {

    try {

        await connectDB();


        const skills = [
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB",
            "Python"
        ];


        const results =
            await resolveSkills(skills);


        console.log(
            JSON.stringify(
                results,
                null,
                2
            )
        );


        process.exit(0);

    } catch (error) {

        console.error(
            "Skill resolution test failed:",
            error
        );

        process.exit(1);
    }
};


test();