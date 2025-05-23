const express = require("express");
const app = express();
const cors = require("cors");
const BlogPosts = require("./BlogPosts");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PostRouter = require("./routes/PostRouter");

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/posts", PostRouter);

app.get("/", function (req, res) {
  res.write("Hello from CodeSandbox!");
  res.end();
});

app.listen(8080, function () {
  console.log("app is listening in port 8080");
});