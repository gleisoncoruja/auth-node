const express = require("express");
const router = express.Router();

// Controllers
const {
  getUsers,
  getUserByUserName,
  createUser,
  getUserReadings,
  updateUser,
  userAuth,
  deleteUser,
  getLoggedUserInfo,
} = require("../controllers/UserController");

// Middleware
const authGuard = require("../middleware/authGuard");
const {
  loginValidation,
  userCreateValidation,
  userUpdateValidation,
} = require("../middleware/userValidation");
const validate = require("../middleware/handleValidation");

// Routes

// Returns all registered users (must be logged in) - Teste 1
router.get("/", authGuard, getUsers);

// Create a new user account - Teste 2
router.post("/", userCreateValidation(), validate, createUser);

// Get logged in user information - Teste 1
router.get("/user/", authGuard, getLoggedUserInfo);

// Get user by username - Teste 1
router.get("/user/:username", getUserByUserName);

// Delete an account, only user with admin role can delete - Teste 3
router.delete("/user/:username", authGuard, deleteUser);

// Update an existing account, user can only edit own account, admin can edit all.
// Only user with admin role will be able to edit roles - Teste 4
router.patch(
  "/user/:username",
  authGuard,
  userUpdateValidation(),
  validate,
  updateUser
);

// Returns how many times the user was read in test 1 -  Teste 5
router.get("/user/:username/readings", getUserReadings);

// endpoint to login
router.post("/auth", loginValidation(), validate, userAuth);

module.exports = router;
