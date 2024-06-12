const customError = require("../utils/customError");

const authenticate = async (req, res, next) => {
  try {
    // checking req.headers ==> is there authorization key?
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw customError("unauthenticated", 401);
    }
    if (!authorization.startsWith("Bearer ")) {
      throw customError("unauthenticated", 401);
    }

    const token = authorization.split(" ")[1];
    console.log(token);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
