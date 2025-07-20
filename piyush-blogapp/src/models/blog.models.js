const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    blogThumbnail: {
      type: String,
      default: "images/defaultBlogThumbnail.jpg",
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    keyword: {
      type: String,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
