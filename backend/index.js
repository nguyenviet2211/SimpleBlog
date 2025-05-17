const express = require("express");
const app = express();
const cors = require("cors");
const BlogPosts = require("./BlogPosts");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");



dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photosOfUser", PhotoRouter);

app.get("/", function (req, res) {
  res.write("Hello from CodeSandbox!");
  res.end();
});

app.get("/api/titles", (req, res) => {
  const titles = BlogPosts.BlogPosts.map((post) => post.title);
  res.send(titles);
});

app.get("/api/description/:id", (req, res) => {
  const postId = req.params.id; // slug
  const post = BlogPosts.BlogPosts.find((p) => p.title === postId);

  if (post) {
    res.json({ title: post.title, description: post.description });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.listen(8080, function () {
  console.log("app is listening in port 8080");
});

app.post("/api/post", jsonParser, (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});

app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "admin") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed}" });
  }
});

app.post("/api/comment", jsonParser, (req, res) => {
  const { postId, comment } = req.body;
  const post = BlogPosts.BlogPosts.find((p) => p.title === postId);
  
  if (post) {
    post.comments.push(comment);
    res.status(200).send({ message: "Comment added successfully", comments: post.comments });
  } else {
    res.status(404).send({ message: "Post not found" });
  }
});

app.get("/api/comments/:id", (req, res) => {
  const postId = req.params.id;
  const post = BlogPosts.BlogPosts.find((p) => p.title === postId);
  
  if (post) {
    res.json({ comments: post.comments });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});