const express = require("express");

const {
    registerUser,
    loginUser,
    uploadProfileImage
} = require("../controllers/userController");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");

// Multer configuration for file upload
const upload = require("../utils/upload");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Upload Profile Image
router.post(
    "/upload-profile",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);

module.exports = router;