const express = require("express");
const router = express.Router();
const authenticate = require("../Middlewares/authenticate");

router.get("/home");

module.exports = router;
