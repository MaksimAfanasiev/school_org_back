const Course = require("../../models/courseModel");

const addCourse = async (req, res, next) => {
  const result = await Course.create(req.body);
  res.status(201).json({
    message: "OK",
  });
};

module.exports = addCourse;
