const prisma = require("../Models/prisma");

const userService = {};

userService.createUser = async ({ username, email, password }) => {
  const userData = { username, email, password };
  console.log("Data Passed to Prisma:", userData);

  return await prisma.user.create({
    data: userData,
  });
};

userService.findUserById = async (userData) => {
  return await prisma.user.findUnique({
    where: { userId: userData }, // userId ==> table in database || userData ==> name of the data from the database(can be any name)
  });
};

userService.findUserByUsername = (userData) =>
  prisma.user.findUnique({
    where: { username: userData },
  });
module.exports = userService;

// userService.findUserById = (userId) =>
//   prisma.user.findFirst({
//     where: { Id: userId },
//   });

module.exports = userService;
