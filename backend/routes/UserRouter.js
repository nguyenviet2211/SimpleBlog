const express = require("express");
const User = require("../db/userModel");
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

// api/user/:id
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const user = await User.findOne(
      { _id: "68204d38fe0120bcdf728c4e" },
      "_id first_name last_name location description occupation"
    );
    if (user) {
      response.send(user);
    } else {
      response.status(400).send({ error: "User Not Found" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message || error });
  }
});

module.exports = router;
