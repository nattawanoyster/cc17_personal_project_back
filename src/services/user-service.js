const prisma = require("../Models/prisma");

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });
userService.findUserByUsername = (username) =>
  prisma.user.findFirst({
    where: { username: username },
  });

module.exports = userService;
