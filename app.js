const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const app = express();
const port = 3000;

const Blog = require("./models/Blog");
const { formatDate } = require("./helpers/HELPERS");
mongoose
  .connect("mongodb://localhost/cleanblog-test-db")
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log("ERROR", err));
//TEMPLATE ENGINE
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get("/", async (req, res) => {
  const blogsData = await Blog.find().exec();
  let blogs = blogsData.map((e) => ({
    title: e.title,
    detail: e.detail,
    dateCreated: formatDate(e.dateCreated),
  }));
  res.render("index", {
    blogs: blogs,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add_post");
});
app.post("/add-blog", async (req, res) => {
  const { title, detail } = req.body;
  await Blog.create({
    title: title,
    detail: detail,
  });
  res.redirect("/");
});
app.listen(port, () => console.log(`Port:${port}. Server is up...`));
