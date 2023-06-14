import APIError from "./APIError.js";

class BadRequestError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
