const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    description: {
      type: String,
      required: true,
      trim: true, // Ensures clean text input
    },
    status: {
      type: String,
      enum: ["open", "closed"], // Restricts value to specified options
      default: "open", // Default value
    },
    repository: {
      type: Schema.Types.ObjectId,
      ref: "Repository", // Links to the `Repository` model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;
