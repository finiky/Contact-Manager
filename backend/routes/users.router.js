const express = require("express");
const router = express.Router();
const userValidation = require("../middleware/validateToken");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");

router.post("/api/users/login", loginUser);
router.post("/api/users/register", registerUser);
router.get("/api/users/current", userValidation, currentUser);

module.exports = router;
