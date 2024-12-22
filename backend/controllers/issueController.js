const createIssue = (req, res) => {
  res.send("Issue created !");
};

const updateIssueById = (req, res) => {
  res.send("update issue!");
};
const deleteIssueById = (req, res) => {
  res.send("Isssue  deleted !");
};
const getAllIssues = (req, res) => {
  res.send("all Issues Fetched !");
};
const getIssueById = (req, res) => {
  res.send("Issue Detailes Fetched!");
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
