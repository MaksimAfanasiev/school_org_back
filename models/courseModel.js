const { Schema, model } = require("mongoose");

const courseSchema = Schema({
  name: {
    type: String,
    required: [true, "Provide cours"],
  },
  books: [String],
  noteBooks: [String],
  class: {
    type: String,
    enume: ["1", "2", "3", "4"],
  },
});

const Course = model("course", courseSchema);

module.exports = Course;
