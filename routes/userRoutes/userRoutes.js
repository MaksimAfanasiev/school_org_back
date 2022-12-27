const { Router } = require("express");
const userControllers = require("../../controllers/userControllers");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = Router();

router.get("/current", authMiddleware, userControllers.getCurrent);

router.post("/register", userControllers.createUser);

router.post("/login", userControllers.loginUser);

router.get("/logout", authMiddleware, userControllers.logoutUser);

module.exports = router;
