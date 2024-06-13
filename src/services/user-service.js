const prisma = require("../Models/prisma");

const userService = {};

userService.createUser = async ({ username, email, password }) => {
  const userData = { username, email, password };
  console.log("Data Passed to Prisma:", userData);

  return await prisma.user.create({
    data: userData,
  });
};

userService.findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

module.exports = userService;

// userService.findUserByUsername = (username) =>
//   prisma.user.findFirst({
//     where: { username: username },
//   });

// userService.findUserById = (userId) =>
//   prisma.user.findFirst({
//     where: { Id: userId },
//   });

module.exports = userService;
