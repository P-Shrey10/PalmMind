const mongoose = require("mongoose");

// Create a user schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
