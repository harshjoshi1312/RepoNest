const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    repositories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        default: [], // Moved default inside the array field
      },
    ],
    followedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [], // Moved default inside the array field
      },
    ],
    starRepos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        default: [], // Moved default inside the array field
      },
    ],
  },
  {
    timestamps: true, // Correct placement of timestamps option
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
