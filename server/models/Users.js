const mongoose = require("../mongodb");

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 80,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    privelages: {
      type: Number,
      required: true,
      default: 1,
      max: 2,
    },
  },
  // {
  //   strict: true,
  // }
);

module.exports = mongoose.model("Users", usersSchema);
