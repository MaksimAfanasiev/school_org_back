const { Schema, model } = require("mongoose");

const daySchemma = Schema({
  day: {
    type: String,
    required: [true, "Provide the day"],
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
  },
  courses: {
    type: [Schema.Types.ObjectId],
    ref: "course",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Day = model("day", daySchemma);

module.exports = Day;
