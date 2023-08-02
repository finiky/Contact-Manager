const userModel = require("../models/userModel");
const registerUser = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;
    if (!name || !password || !email) {
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
    const registerUser = await userModel.create({ name, email, password });
    response.status(200).json(registerUser);
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
