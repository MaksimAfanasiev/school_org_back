const Day = require("../../models/dayModel");
const RequestError = require("../../helpers/RequestError");

//FrontendDayModel = {
//         day: "monday",
//         courses: ["id1", "id2"]
//       }

const addDay = async (req, res, next) => {
  try {
    if (!req.body.courses.length || !req.body.day) {
      throw RequestError(400, "Not enough data");
    }

    const day = await Day.findOne({ day: req.body.day, owner: req.user._id });

    if (day) {
      throw RequestError(400, "The day is already created");
    }

    const newDay = await Day.create({
      day: req.body.day,
      courses: req.body.courses,
      owner: req.user._id,
    });

    const result = await Day.findById(newDay._id)
      .populate("owner")
      .populate("courses");

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getDays = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const days = await Day.find({ owner: userId }).populate("courses");

    if (!days) {
      throw RequestError(401, "Bad request")
    }
    
    res.status(200).json(days)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addDay,
  getDays,
};
