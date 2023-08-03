const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
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
      response.status(200).json({
        _id: registerUser._id,
        username: registerUser.username,
        email: registerUser.email,
      });
    } else {
      response.status(400);
      throw new Error(`Error registering the user. Kindly try again.`);
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      response.status(400);
      throw new Error("Password and Email id are required");
    }
    const registerdUser = await userModel.findOne({ email });
    if (!registerdUser) {
      response.status(400);
      throw new Error(`User with Email Id: ${email} is not registered`);
    }
    if (registerdUser) {
      const passwordValidation = await bcrypt.compare(
        password,
        registerdUser.password
      );
      if (!passwordValidation) {
        response.status(401);
        throw new Error("Email Id and Password combination is not valid");
      }
      if (passwordValidation) {
        const accessToken = jwt.sign(
          {
            user: {
              username: registerdUser.username,
              email: registerdUser.email,
              _id: registerdUser._id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        response.cookie({ name: accessToken });
        response.status(200).json({ accessToken });
        
      }
    }
  } catch (error) {
    next(error);
  }
};

//@access: private
const currentUser = (request, response, next) => {
  try {
    const user = request.user;
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  currentUser,
  loginUser,
};
