const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".demodir");
  const stagePath = path.join(repoPath, "staging");

  try {
    await fs.mkdir(stagePath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagePath, fileName));
    console.log(`FIle ${fileName} added to the staging area`);
  } catch (error) {
    console.error("Error adding file : ", error);
  }
}

module.exports = { addRepo };
