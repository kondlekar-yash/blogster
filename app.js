require("dotenv").config();

const express = require("express");
const connectDB = require("./database/db");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const port = process.env.PORT || 4000;

// connect to mongodb
connectDB();

// middleware & static files
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// register view engine
app.set("view engine", "ejs");
//TODO: migrate to react in separate project/repo

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
