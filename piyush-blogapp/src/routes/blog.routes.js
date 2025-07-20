const express = require("express");
const multer = require("multer");
const path = require("path");

const { handleBlogCreation } = require("../controllers/blog.controllers");

const blogRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

blogRouter
  .route("/create-new-blog")
  .get((req, res) => {
    return res.render("addBlog", {
      user: req.user,
    });
  })
  .post(upload.single("coverImage"), handleBlogCreation);

module.exports = blogRouter;
