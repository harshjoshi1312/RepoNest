const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ReturnDocument } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

// common function for the connections
async function connectClient() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}

// == signup User ==
// 1 establish connection
// 2 create hash pass
// 3 generate token
// 4 save user
async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("CodenestDb");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User alread exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token, userId: result.insertedId });
  } catch (error) {
    console.error("error during signup :", error.message);
    res.status(500).send("server error");
  }
}

// == Login User ==
// 1 connection established
// 2 find user
// validate the token or expand it

async function login(req, res) {
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("CodenestDb");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error durign the login : ", error.message);
    res.status(500).send("server error");
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("CodenestDb");
    const userCollection = db.collection("users");

    const users = await userCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error durign the fetching : ", error.message);
    res.status(500).send("server error");
  }
}

async function getUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    await connectClient();
    const db = client.db("CodenestDb");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({
      _id: new ObjectId(currentID),
    });
    if (!user) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.send(user);
  } catch (error) {
    console.error("Error durign the fetching user profile : ", error.message);
    res.status(500).send("server error");
  }
}

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    let updateFields = { email };
    await connectClient();
    const db = client.db("CodenestDb");
    const userCollection = db.collection("users");

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }
    const result = await userCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentID),
      },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.send(result.value);
  } catch (error) {
    console.error("Error durign the fetching user profile : ", error.message);
    res.status(500).send("server error");
  }
}

async function deleteUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("CodenestDb");
    const userCollection = db.collection("users");

    const result = await userCollection.deleteOne({
      _id: new ObjectId(currentID),
    });
    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.json({ message: "User Profile  Deleted" });
  } catch (error) {
    console.error("Error durign the fetching user profile : ", error.message);
    res.status(500).send("server error");
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
