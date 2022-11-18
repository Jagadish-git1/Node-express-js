const { CustomApiError } = require("../Errors/CustomError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Something Went wrong" });
};

module.exports = errorHandler;
