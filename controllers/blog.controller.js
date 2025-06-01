const { formatDate } = require("../helpers/HELPERS");
const Blog = require("../models/Blog");

const blogsGetAll = async (req, res) => {
  const blogsData = await Blog.find().exec();
  let blogs = blogsData.map((e) => ({
    _id: e._id,
    title: e.title,
    detail: e.detail,
    dateCreated: formatDate(e.dateCreated),
  }));
  res.render("index", {
    blogs: blogs,
  });
};
const addBlog = async (req, res) => {
  const { title, detail } = req.body;
  await Blog.create({
    title: title,
    detail: detail,
  });
  res.redirect("/");
};

const blogsGetById = async (req, res) => {
  let id = req.params.id;
  const blogData = await Blog.findById(id).exec();
  let formatted = {
    _id: blogData._id,
    title: blogData.title,
    detail: blogData.detail,
    dateCreated: formatDate(blogData.dateCreated),
  };
  res.render("post", { blog: formatted });
};

const updateBlog = async (req, res) => {
  let id = req.params.id;
  const { title, detail } = req.body;
  await Blog.findByIdAndUpdate(id, {
    $set: { title, detail },
  });
  res.redirect(`/blogs/${id}`);
};

const deleteBlog = async (req, res) => {
  let id = req.params.id;
  await Blog.findByIdAndDelete(id);
  res.redirect("/");
};
module.exports = {
  addBlog,
  blogsGetAll,
  blogsGetById,
  updateBlog,
  deleteBlog,
};
