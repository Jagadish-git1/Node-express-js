const CustomAPIError = require("../errors/custom-error");
const { UnauthenticatedError } = require("../errors/index");
const Jwt = require("jsonwebtoken");

const authenticationMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("No/Invliad token Provided");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = Jwt.verify(token, process.env.JWT_TOKEN);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (rrr) {
    throw new UnauthenticatedError("No/Invliad token Provided");
  }
};

module.exports = authenticationMiddleWare;
