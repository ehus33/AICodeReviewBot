require("dotenv").config();

module.exports = {
    githubToken: process.env.GITHUB_TOKEN,
    openAiKey: process.env.OPENAI_API_KEY,
};
