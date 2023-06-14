class APIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default APIError;
