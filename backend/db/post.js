const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    date: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  slug: {type: String, unique: true},
  title: { type: String },
  description: { type: String },
  Comments: [CommentSchema],
});

module.exports = mongoose.model.Posts || mongoose.model("Posts", postSchema);