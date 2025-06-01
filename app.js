const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const ejs = require("ejs");
const path = require("path");
const app = express();
const port = 3000;

const blogController = require("./controllers/blog.controller");
const pageController = require("./controllers/page.controller");

mongoose
  .connect("mongodb://localhost/cleanblog-test-db")
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log("ERROR", err));
//TEMPLATE ENGINE
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//ROUTES

//blog controller
app.get("/", blogController.blogsGetAll);
app.get("/blogs/:id", blogController.blogsGetById);
app.post("/add-blog", blogController.addBlog);
app.put("/blogs/:id", blogController.updateBlog);
app.delete("/blogs/:id", blogController.deleteBlog);

//page controller
app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/blogs/edit/:id", pageController.getEditPage);

app.listen(port, () => console.log(`Port:${port}. Server is up...`));
