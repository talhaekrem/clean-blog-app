const Blog = require("../models/Blog");

const getAboutPage = (req, res) => {
  res.render("about");
};

const getAddPage = (req, res) => {
  res.render("add_post");
};

const getEditPage = async (req, res) => {
  res.render("edit", {
    blog: await Blog.findById(req.params.id),
  });
};

module.exports = {
  getAboutPage,
  getAddPage,
  getEditPage,
};
