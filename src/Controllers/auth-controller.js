const prisma = require("../Models/prisma");
const customError = require("../utils/customError");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { username, password, confirmpassword, email } = req.body;
  try {
    // Validation (receive body: username, password, comfirmpassword, email)
    if (!username || !password || !confirmpassword || !email) {
      //   const error = new Error("Please fill all input");
      //   error.statusCode = 400;
      return next(customError("Please fill all input", 400));
    }

    if (password !== confirmpassword) {
      //   const error = new Error(
      //     "Confirmpassword is not match with password. Please try agian."
      //   );
      //   error.statusCode = 400;
      //   return next(error);
      throw customError(
        "Confirmpassword is not match with password. Please try agian.",
        400
      );
    }
    // hash password --> bcryptjs
    const hashedPassword = await bcrypt.hash(password, 8);
    const data = {
      username: username,
      password: hashedPassword,
      email: email,
    };

    // creatr user in prisma.user
    const result = await prisma.user.create({
      data: data,
    });
    console.log(result);
    res.json({ message: "Register Successfully" });

    console.log(req.body);

    res.json({ message: "Please register" });
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {
  res.json({ message: "Please login to continue our website" });
};

module.exports = { register, login };
