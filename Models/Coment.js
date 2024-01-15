import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    VidioId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    Comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
