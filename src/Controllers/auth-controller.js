const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const customError = require("../utils/customError");

const authController = {};

// authController.register = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.input;
//     console.log("Register Input in Controller:", { username, email, password });

//     const existUser = await userService.findUserByUsername(username);
//     if (existUser) {
//       return next(
//         customError({ message: "Username already in use", statusCode: 400 })
//       );
//     }

//     const hashedPassword = await hashService.hash(password);
//     const userData = { username, email, password: hashedPassword };
//     console.log("User Data to Create:", userData);

//     await userService.createUser(userData);

//     res.status(201).json({ message: "User Created" });
//   } catch (error) {
//     next(error);
//   }
// };

authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    const existUser = await userService.findUserByUsername(data.username);

    if (existUser) {
      customError({
        message: "Username already in use",
        field: "username",
        statusCode: 400,
      });
    }

    data.password = await hashService.hash(data.password);
    // console.log(data);
    await userService.createUser(data);
    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    console.log(req.input);
    const existUser = await userService.findUserByUsername(req.input.username);
    if (!existUser) {
      customError({
        message: "invalid credentials",
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      existUser.password
    );
    if (!isMatch) {
      customError({
        message: "Password is wrong",
        statusCode: 400,
      });
    }
    // console.log(existUser);
    const accessToken = jwtService.sign({ id: existUser.userId });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;

// const prisma = require("../Models/prisma");
// const customError = require("../utils/customError");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const register = async (req, res, next) => {
//   const { username, password, confirmpassword, email } = req.body;
//   try {
//     // Validation (receive body: username, password, comfirmpassword, email)
//     if (!username || !password || !confirmpassword || !email) {
//       //   const error = new Error("Please fill all input");
//       //   error.statusCode = 400;
//       return next(customError("Please fill all input", 400));
//     }

//     if (password !== confirmpassword) {
//       //   const error = new Error(
//       //     "Confirmpassword is not match with password. Please try agian."
//       //   );
//       //   error.statusCode = 400;
//       //   return next(error);
//       throw customError(
//         "Confirmpassword is not match with password. Please try agian.",
//         400
//       );
//     }

//     const existUser = await prisma.user.findUnique({
//       where: { username: username },
//     });
//     if (existUser) {
//       throw customError("This username already exist", 400);
//     }

//     // hash password --> bcryptjs
//     const hashedPassword = await bcrypt.hash(password, 8);
//     const data = {
//       username: username,
//       password: hashedPassword,
//       email: email,
//     };

//     // creatr user in prisma.user
//     const result = await prisma.user.create({
//       data: data,
//     });
//     console.log(result);
//     res.json({ message: "Register Successfully" });

//     console.log(req.body);

//     res.json({ message: "Please register" });
//   } catch (err) {
//     next(err);
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     // Validation
//     if (!(username && password)) {
//       throw customError("Please fill username and password", 400);
//     }

//     // find username in prisma.user
//     const targetUser = await prisma.user.findUnique({
//       where: { username: username },
//     });
//     if (!targetUser) {
//       throw customError("Invaid login, User not found", 400);
//     }

//     // check password
//     const passwordRight = await bcrypt.compare(password, targetUser.password);
//     if (!passwordRight) {
//       throw customError("Username or Password is incorrect", 400);
//     }

//     // create jwt-token
//     // make payload = {ID, Username}
//     // jwt.sign = {expiresIn: '7d'}

//     const payload = { id: targetUser.userId };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     console.log(token);

//     // response token

//     res.json({ token: token });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { register, login };
