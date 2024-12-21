const fs = require("fs").promises;
const path = require("path");
const { json, buffer } = require("stream/consumers");

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".demodir");
  const commitsPath = path.join(repoPath, "commits");

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET })
    );
    console.log("Repository has been initialized");
  } catch (err) {
    console.error("Error initializing repository");
  }
}

module.exports = { initRepo };
// easy just making path for the init