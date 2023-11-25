const express = require("express");
const router = express.Router();

// Import routes
const adminRoutes = require("../adminRoutes");
const gfRoutes = require("../girlFriendRoutes");

// Routes
router.use(adminRoutes);
router.use(gfRoutes);

module.exports = router;
