require("dotenv").config();
const { BadRequest, UnauthenticatedError } = require("../errors");
const Jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new BadRequest("Please provide email and password");
  const id = new Date().getDate();
  const jwtToken = Jwt.sign({ id, username }, process.env.JWT_TOKEN, {
    expiresIn: "2d",
  });
  res.status(200).json({ msg: "User created", jwtToken });
};

const dashBoard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  try {
    res.status(200).json({
      msg: `Hi ${req.user.username}`,
      secret: `Here is your lucky number ${luckyNumber}`,
    });
  } catch (err) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = { login, dashBoard };
