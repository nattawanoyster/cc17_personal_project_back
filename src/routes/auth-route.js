const express = require("express");
const authController = require("../Controllers/auth-controller");
const prisma = require("../Models/prisma");
const {
  registerValidator,
  loginValidator,
} = require("../Middlewares/validator");
const authenticate = require("../Middlewares/authenticate");

const router = express.Router();

// Registration route
router.post("/register", registerValidator, authController.register);

// Login route
router.post("/login", loginValidator, authController.login);

// Get authenticated user route
router.get("/me", authenticate, authController.getMe);

// Get songs for Red Velvet home page
router.get("/home-redvelvet", async (req, res) => {
  try {
    const data = await prisma.song.findMany();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Failed to fetch songs." });
  }
});

// Get songs for Aespa home page
router.get("/home-aespa", async (req, res) => {
  try {
    const data = await prisma.song.findMany();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Failed to fetch songs." });
  }
});

// Add song to favorites
router.post("/add-to-favorites", authenticate, async (req, res) => {
  const { songId } = req.body;
  const userId = req.user.userId;

  try {
    const favoriteSong = await prisma.favoriteSong.create({
      data: {
        userId: userId,
        songId: songId,
      },
    });

    res.status(200).json(favoriteSong);
  } catch (error) {
    console.error("Error adding song to favorites:", error);
    res.status(500).json({ error: "Failed to add song to favorites." });
  }
});

// Delete song from favorites
router.delete(
  "/delete-from-favorites/:favoriteSongId",
  authenticate,
  async (req, res) => {
    const { favoriteSongId } = req.params;

    try {
      const deletedFavorite = await prisma.favoriteSong.delete({
        where: {
          favoriteSongID: parseInt(favoriteSongId),
        },
      });

      res.status(200).json({ message: "Favorite song deleted successfully." });
    } catch (error) {
      console.error("Error deleting favorite song:", error);
      res.status(500).json({ error: "Failed to delete favorite song." });
    }
  }
);

// Fetch favorite songs for a user
router.get("/favorites/:userId", authenticate, async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const favoriteSongs = await prisma.favoriteSong.findMany({
      where: { userId },
      include: {
        favSong: true, // Include the Song details
      },
    });

    res.status(200).json(favoriteSongs);
  } catch (error) {
    console.error("Error fetching favorite songs:", error);
    res.status(500).json({ error: "Failed to fetch favorite songs." });
  }
});

// Update profile route
router.put("/update-profile", authenticate, async (req, res) => {
  const { username, profileImage } = req.body;
  const userId = req.user.userId;

  try {
    if (!username || !profileImage) {
      return res
        .status(400)
        .json({ error: "Username and profile image are required." });
    }

    const updatedUser = await prisma.user.update({
      where: { userId },
      data: { username, profileImage },
    });

    console.log("Profile update successful:", updatedUser); // Log successful update
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res
      .status(500)
      .json({ error: `Failed to update profile: ${error.message}` });
  }
});

module.exports = router;
