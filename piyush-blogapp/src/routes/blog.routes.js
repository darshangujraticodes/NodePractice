const express = require("express");
const { handleBlogCreation } = require("../controllers/blog.controllers");

const blogRouter = express.Router();

blogRouter
  .route("/create-new-blog")
  .get((req, res) => {
    return res.render("addBlog", {
      user: req.user,
    });
  })
  .post(handleBlogCreation);

module.exports = blogRouter;
