const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "repository name is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invlaid User Id" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();
    res.status(201).json({
      message: "repository created",
      repositoryID: result._id,
    });
  } catch (error) {
    console.error("Error durign repo creation : ", error.message);
    res.status(500).send("server error");
  }
}

async function getAllRepositories(req, res) {
  res.send("All reposirtory fetched!");
}

async function fetchRepositoryById(req, res) {
  res.send("All udetails fetch !");
}

async function fetchRepositoryByName(req, res) {
  res.send("All repo by name!");
}

async function fetchRepositoriesForCurrentUser(req, res) {
  res.send("Repositorys for logeed in user fetched !");
}

async function updateRepositorById(req, res) {
  res.send("repo updated !");
}

async function toggleVisibilityById(req, res) {
  res.send("visibility!");
}

async function deleteRepositorById(req, res) {
  res.send("repo deleted !");
}

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
