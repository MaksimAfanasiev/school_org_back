const { Router } = require("express");
const dayControllers = require("../../controllers/plannerControllers/dayControllers");
const authMiddleware = require("../../middlewares/authMiddleware");

const route = Router();

route.post("/addDay", authMiddleware, dayControllers.addDay);

route.get("/getDays", authMiddleware, dayControllers.getDays);

module.exports = route;
