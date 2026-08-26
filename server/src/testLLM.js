require("dotenv").config();

const {
    analyzeGoal
} = require("./services/llm/goalAnalyzer");


const test = async () => {

    const result =
        await analyzeGoal(
            "I want to become a machine learning engineer"
        );


    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );
};


test();