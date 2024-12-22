const createRepository = (req, res) => {
  res.send("repository created !");
};

const getAllRepositories = (req, res) => {
  res.send("All reposirtory fetched!");
};

const fetchRepositoryById = (req, res) => {
  res.send("All udetails fetch !");
};

const fetchRepositoryByName = (req, res) => {
  res.send("All repo by name!");
};

const fetchRepositoriesForCurrentUser = (req, res) => {
  res.send("Repositorys for logeed in user fetched !");
};

const updateRepositorById = (req, res) => {
  res.send("repo updated !");
};

const toggleVisibilityById = (req, res) => {
  res.send("visibility!");
};

const deleteRepositorById = (req, res) => {
  res.send("repo deleted !");
};

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositorById,
  toggleVisibilityById,
  deleteRepositorById,
};