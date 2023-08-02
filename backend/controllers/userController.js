const userSchema = require("../models/userModel");
const registerUser = (request, response, next) => {
  try {
    const { name, password, email } = request.body;
    if (!name || !password || !email) {
      response.status(400);
      throw new Error(
        "Kindly ensure that the name, email and password fields are filled"
      );
    }
    response.status(200).json({ message: "Register User" });
  } catch (error) {
    next(error);
  }
};

const currentUser = (request, response, next) => {
  try {
    const { login } = request.params;
    response.status(200).json({ message: "Current User" });
  } catch (error) {
    next(error);
  }
  response.status(200).json({ message: "Current User" });
};

const loginUser = (request, response, next) => {
  try {
    response.status(200).json({ message: "Login User" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  currentUser,
  loginUser,
};
