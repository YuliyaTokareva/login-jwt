module.exports = class ApiError extends Error {
  status;
  error;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnautorizedError() {
    return new ApiError(401, `User isn't autorize`);
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
