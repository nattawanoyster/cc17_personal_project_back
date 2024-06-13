const express = require("express");
const authController = require("../Controllers/auth-controller");
const prisma = require("../Models/prisma");
const {
  registerValidator,
  loginValidator,
} = require("../Middlewares/validator");
const authenticate = require("../Middlewares/authenticate");

const router = express.Router();

router.post("/register", registerValidator, authController.register);
// router.post("/login", loginValidator, authController.login);
// router.get("/me", authenticate, authController.getMe);
router.get("/home-redvelvet", async (req, res, next) => {
  console.log("object");
  const data = await prisma.song.findMany();
  res.status(200).json({ data });
});

module.exports = router;
