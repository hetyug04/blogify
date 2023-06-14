import APIError from "./APIError.js";

class UnauthenticatedError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnauthenticatedError;
