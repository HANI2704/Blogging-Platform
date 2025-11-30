import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: Date,
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  excerpt: String,
  category: String,
  author: String,
  likes: Number,
  comments: [CommentSchema],
  createdAt: Date,
  updatedAt: Date,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
