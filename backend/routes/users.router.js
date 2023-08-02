const express = require("express");
const router = express.Router();
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");

router.get("/api/users/login", loginUser);
router.post("/api/users/register", registerUser);
router.get("/api/users/current", currentUser);

module.exports = router;
