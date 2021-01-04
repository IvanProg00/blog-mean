const mongoose = require("../mongodb");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  privelages: {
    type: Number,
    required: true,
    default: 1,
    max: 2,
  },
});

module.exports = mongoose.model("Users", usersSchema);
