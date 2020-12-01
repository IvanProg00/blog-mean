const mongoose = require("../mongodb");

const tagsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 60
  }
});

module.exports = mongoose.model("Tags", tagsSchema);