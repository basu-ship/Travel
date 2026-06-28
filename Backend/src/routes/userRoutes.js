const express = require("express");

const {
    registerUser,
    loginUser,
    uploadProfileImage,
    updateProfile
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

// Upload profile image
router.post(
    "/upload-profile",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);
// Update Profile
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

module.exports = router;