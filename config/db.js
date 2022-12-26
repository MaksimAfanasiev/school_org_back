const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

const DB_URI =
  "mongodb+srv://planneruser32:planorg123@cluster0.0i6w7au.mongodb.net/db_planner?retryWrites=true&w=majority";

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log(`Data Base connected on host ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
