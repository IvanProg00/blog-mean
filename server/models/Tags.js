const mongoose = require("../mongodb");

const tagsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Tags", tagsSchema);