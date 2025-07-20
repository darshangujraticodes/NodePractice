const Blog = require("../models/blog.models");

async function handleBlogCreation(req, res) {
  const { coverImage, title, mainContent } = req.body;

  console.log(req.body);

  return res.render("addBlog");
}

module.exports = {
  handleBlogCreation,
};
