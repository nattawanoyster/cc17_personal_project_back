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
router.post("/login", loginValidator, authController.login);
router.get("/me", authenticate, authController.getMe);

router.get("/home-redvelvet", async (req, res, next) => {
  console.log("object");
  const data = await prisma.song.findMany();
  res.status(200).json({ data });
});

router.get("/home-aespa", async (req, res, next) => {
  console.log("object");
  const data = await prisma.song.findMany();
  res.status(200).json({ data });
});

module.exports = router;

// Add song to favorites
// router.post("/add-to-favorites", async (req, res) => {
//   const { songId } = req.body;

//   try {
//     const userId = req.session.userId; // Assuming userId is set in session during authentication

//     // Create a favorite song entry
//     const favoriteSong = await prisma.favoriteSong.create({
//       data: {
//         userId: userId,
//         songId: songId,
//       },
//     });

//     res.status(200).json({ message: "Song added to favorites!" });
//   } catch (error) {
//     console.error("Error adding song to favorites:", error);
//     res.status(500).json({ error: "Failed to add song to favorites." });
//   }
// });

// // Delete song from favorites
// router.delete("/delete-from-favorites/:favoriteSongId", async (req, res) => {
//   const { favoriteSongId } = req.params;

//   try {
//     const deletedFavorite = await prisma.favoriteSong.delete({
//       where: {
//         favoriteSongID: parseInt(favoriteSongId),
//       },
//     });

//     res.status(200).json({ message: "Favorite song deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting favorite song:", error);
//     res.status(500).json({ error: "Failed to delete favorite song." });
//   }
// });

// router.get("/home-redvelvet", async (req, res, next) => {
//   console.log("object");
//   const data = await prisma.song.findMany();
//   res.status(200).json({ data });
// });

// module.exports = router;
