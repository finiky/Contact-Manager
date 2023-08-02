const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;
    if (!username || !password || !email) {
      response.status(400);
      throw new Error(
        "Kindly ensure that the name, email and password fields are filled"
      );
    }
    const userAvailibility = await userModel.findOne({ email });
    if (userAvailibility) {
      response.status(400);
      throw new Error(`User with Email Id: ${email} already exists.`);
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const registerUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (registerUser) {
      response.status(200).json(registerUser);
    } else {
      response.status(404);
      throw new Error(`Error registering the user. Kindly try again.`);
    }
  } catch (error) {
    next(error);
  }
};

//@access: private
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
