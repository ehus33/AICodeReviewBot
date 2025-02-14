const { processPullRequest } = require("./githubService");

async function handleWebhook(req, res) {
    const event = req.headers["x-github-event"];

    if (event === "pull_request") {
        const action = req.body.action;
        if (action === "opened" || action === "synchronize") {
            await processPullRequest(req.body);
        }
    }

    res.sendStatus(200);
}

module.exports = { handleWebhook };
