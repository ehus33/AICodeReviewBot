const { Octokit } = require("@octokit/rest");
const { analyzeCode } = require("./aiAnalyzer");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function processPullRequest(payload) {
    const { repository, pull_request } = payload;
    const owner = repository.owner.login;
    const repo = repository.name;
    const prNumber = pull_request.number;

    const { data: files } = await octokit.pulls.listFiles({ owner, repo, pull_number: prNumber });

    for (const file of files) {
        const { filename, patch } = file;
        if (!patch) continue;

        const reviewComment = await analyzeCode(filename, patch);
        if (reviewComment) {
            await octokit.pulls.createReviewComment({
                owner,
                repo,
                pull_number: prNumber,
                body: reviewComment,
                commit_id: pull_request.head.sha,
                path: filename,
                position: 1 // Adjust position as needed
            });
        }
    }
}

module.exports = { processPullRequest };
