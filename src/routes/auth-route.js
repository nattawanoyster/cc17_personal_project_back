const express = require("express");
const authController = require("../Controllers/auth-controller");
const router = express.Router();
const prisma = require("../Models/prisma");
const registerValidator = require("../Middlewares/validator");

router.post("/register", registerValidator, authController.register);
// router.post("/login", authController.login);
router.get("/home-redvelvet", async (req, res, next) => {
  console.log("object");
  const data = await prisma.song.findMany();
  res.status(200).json({ data });
});

module.exports = router;
