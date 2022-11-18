class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  const err = new CustomApiError(msg, statusCode);
  console.log(err instanceof CustomApiError);
  return err;
};

module.exports = { createCustomError, CustomApiError };
