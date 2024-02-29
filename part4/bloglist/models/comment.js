const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String
});

module.exports = commentSchema;