const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  firstName: {
    type: String,
    required: [true, "DB:Name is required"],
  },
  secondName: {
    type: String,
    required: [true, "DB:Second name is required"],
  },
  group: {
    type: String,
    required: [true, "DB:Provide your group"],
  },
  password: {
    type: String,
    required: [true, "DB:Provide your password"],
  },
  token: String,
});

const User = model("user", UserSchema);

module.exports = User;
