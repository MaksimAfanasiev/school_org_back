const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const { json, urlencoded } = require("express");
const userRoutes = require("./routes/userRoutes/userRoutes");

const PORT = "5050";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// Routes;
app.use("/api/v1/user", userRoutes);

//404
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
  })
})

dbConnect();

app.listen(PORT, () => {
  console.log(`Server starts on port ${PORT}`);
});
