const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const customError = require("../utils/customError");

const authenticate = async (req, res, next) => {
  try {
    // checking req.headers ==> is there authorization key?
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      customError({
        message: "unauthenticated",
        statusCode: 401,
      });
    }

    const accesstoken = authorization.split(" ")[1];
    const payload = jwtService.verify(accesstoken);
    console.log(payload);

    const user = await userService.findUserById(payload.id);
    if (!user) {
      customError({
        message: "User is not found",
        statusCode: 400,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
