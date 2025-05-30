const express = require("express");
const Post = require("../db/post");
const router = express.Router();

// Get all posts
router.get("/", async (request, response) => {
  try {
    const posts = await Post.find({}, "title slug");
    response.json(posts);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Get post by id
router.get("/:id", async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }
    response.json(post);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Get post by slug
router.get("/slug/:slug", async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug })
                            .populate("Comments.user", "first_name last_name");
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }
    response.json(post);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Create post
router.post("/", async (request, response) => {
  try {
    const post = new Post(request.body);
    const savedPost = await post.save();
    response.status(201).json(savedPost);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

// Add comment to post
router.post("/:id/comment", async (request, response) => {
  try {
    const post = await Post .findById(request.params.id)
                            .populate("Comments.user", "first_name last_name");
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }
    
    post.Comments.push({
      user: request.body.userId,
      text: request.body.text
    });
    
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

// Update post
router.put("/:id", async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }
    
    Object.keys(request.body).forEach(key => {
      // Don't allow direct modification of comments array
      if (key !== 'Comments') {
        post[key] = request.body[key];
      }
    });
    
    const updatedPost = await post.save();
    response.json(updatedPost);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

// Delete post
router.delete("/:id", async (request, response) => {
  try {
    const post = await Post.findByIdAndDelete(request.params.id);
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }
    response.json({ message: "Post deleted successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;
