const Blog = require("../models/blog.models");
const convertIntoUrlFormat = require("../utils/urlConvertor");

async function handleBlogCreation(req, res) {
  const { title, body } = req.body;

  let coverImgPath;
  // console.log(req.body);
  // console.log(req.file);
  if (!req.file) {
    coverImgPath = "/images/defaultBlogThumbnail.jpg";
  } else {
    coverImgPath = `/uploads/${req.file.filename}`;
  }

  const blogURL = convertIntoUrlFormat(title);

  // console.log(req.body, blogURL);

  try {
    const blog = await Blog.create({
      title,
      body,
      url: blogURL,
      createdBy: req.user._id,
      coverImage: coverImgPath,
    });

    return res.status(201).redirect("/");
  } catch (error) {
    console.log("handleBlogCreation | Error", error.message);
  }

  return res.render("addBlog");
}

module.exports = {
  handleBlogCreation,
};
