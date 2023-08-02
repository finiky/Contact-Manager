const express = require("express");
const router = express.Router();

router.get("/login", (request, response) => {
  response.status(200).json({ message: "Login User" });
});
router.post("/register", (request, response) => {
  response.status(200).json({ message: "Register User" });
});
router.get("/current", (request, response) => {
  response.status(200).json({ message: "Current User" });
});


module.exports = router;
