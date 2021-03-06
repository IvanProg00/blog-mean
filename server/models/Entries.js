const mongoose = require("../mongodb");

const entriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  usersId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    }
  ,
  tagsId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags",
      required: true
    }

})

module.exports = mongoose.model("entries", entriesSchema);
