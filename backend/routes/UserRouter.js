const express = require("express");
const User = require("../db/user");
const router = express.Router();

router.get("/", async (request, response) => {
  response.send("hello");
});

router.get("/list", async (request, response) => {
  try {
    const userList = await User.find({}, "_id first_name last_name");
    response.send(userList);
  } catch (error) {
    response.status(500).send({ error: error.message || error });
  }
});


router.post("/login", async (request, response) => {
  try {
    const cred = {
      username: request.body.username,
      password: request.body.password
    };
    const user = await User.findOne({user_name: cred.username, password: cred.password});
    
    if(!user){
      return response.status(401).send({ error: "Invalid username or password" });
    } else {
      response.send({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        message: "Login successful"
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).send({ error: error.message || "An error occurred during login" });
  }
});

// api/user/:id
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const user = await User.findById(id, "_id first_name last_name location description occupation");
    if (user) {
      response.send(user);
    } else {
      response.status(404).send({ error: "User Not Found" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message || error });
  }
});

// Create new user
router.post("/", async (request, response) => {
  try {
    const user = new User(request.body);
    const savedUser = await user.save();
    response.status(201).send(savedUser);
  } catch (error) {
    response.status(400).send({ error: error.message || error });
  }
});

// Update user
router.put("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).send({ error: "User Not Found" });
    }

    // Update user fields
    const updates = Object.keys(request.body);
    updates.forEach((update) => (user[update] = request.body[update]));
    
    const updatedUser = await user.save();
    response.send(updatedUser);
  } catch (error) {
    response.status(400).send({ error: error.message || error });
  }
});

// Delete user
router.delete("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return response.status(404).send({ error: "User Not Found" });
    }
    response.send({ message: "User deleted successfully" });
  } catch (error) {
    response.status(500).send({ error: error.message || error });
  }
});

module.exports = router;
