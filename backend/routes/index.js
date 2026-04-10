const express = require("express");

const authRoutes = require("./auth");
const postRoutes = require("./post");
const userRoutes = require("./user");

const router = express.Router();

router.use(authRoutes);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);

module.exports = router;
