const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Ensures no leading/trailing whitespace
    },
    description: {
      type: String,
      trim: true, // Optional but recommended for text fields
    },
    content: [
      {
        type: String,
        default: [], // Default to an empty array
      },
    ],
    visibility: {
      type: Boolean,
      default: true, // Define default visibility
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        default: [], // Default to an empty array
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;
