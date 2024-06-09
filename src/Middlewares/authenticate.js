const customError = require("../utils/customError");

const authenticate = async (req, res, next) => {
  try {
    // checking req.headers ==> is there authorization key?
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw customError("unauthenticated", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
