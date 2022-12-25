const { Router } = require("express");

const router = Router();

router.get("/:id", (req, res) => {
  res.json({
    code: 200,
    status: "success",
    data: "Get user by Id",
  });
});

router.post("/register", (req, res) => {
  res.json({
    code: 201,
    status: "created",
    data: "User register",
  });
});

router.post("/login", (req, res) => {
  res.json({
    code: 200,
    status: "success",
    data: "User login",
  });
});

router.post("/logout", (req, res) => {
  res.json({
    code: 200,
    status: "sucsess",
    data: "User logout",
  });
});

module.exports = router;
