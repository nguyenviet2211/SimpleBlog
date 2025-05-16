const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");
const mongoose = require("mongoose");

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({ error: "Invalid user ID format" });
    }

    const photos = await Photo.find(
      { user_id: id },
      "_id user_id comments file_name date_time"
    );
    if (photos.length) {
      const enhancedPhotos = await Promise.all(
        photos.map(async (photo) => {
          const commentsWithUser = await Promise.all(
            photo.comments.map(async (comment) => {
              let user = null;
              if (mongoose.Types.ObjectId.isValid(comment.user_id)) {
                user = await User.findById(
                  comment.user_id,
                  "_id first_name last_name"
                );
              }
              return {
                _id: comment._id,
                comment: comment.comment,
                date_time: comment.date_time,
                user: user || null,
              };
            })
          );

          return {
            _id: photo._id,
            user_id: photo.user_id,
            file_name: photo.file_name,
            date_time: photo.date_time,
            comments: commentsWithUser,
          };
        })
      );

      response.send(enhancedPhotos);
    } else {
      response.status(400).send({ error: "Not Found" });
    }
  } catch (error) {
    console.error("Lỗi:", error);
    response.status(500).send({ error: error.message || error });
  }
});

router.get("/", async (request, response) => {});

module.exports = router;
