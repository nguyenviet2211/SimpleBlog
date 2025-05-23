const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
  user_name: {type: String, unique: true},
  password: {type: String}
});

module.exports = mongoose.model.Users || mongoose.model("User", userSchema);