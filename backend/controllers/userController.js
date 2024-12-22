const getAllUsers = (req, res) => {
  res.send("all users fetched");
};

const signup = (req, res) => {
  res.send("signing up");
};

const login = (req, res) => {
  res.send("Logginf In ");
};

const getUserProfile = (req, res) => {
  res.send("profile fetched");
};

const updateUserProfile = (req, res) => {
  res.send("profile updated");
};

const deleteUserProfile = (req, res) => {
  res.send("profile deleted");
};

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
