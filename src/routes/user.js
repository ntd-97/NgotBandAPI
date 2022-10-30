const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// ADD USER
router.post("/", userController.addUser);

// GET ALL USERS
router.get("/", userController.getAllUsers);

// GET USER INFO
router.get("/:id", userController.getUserInfo);

// UPDATE USER
router.put("/:id", userController.updateUser);

// DELETE USER
router.delete("/:id", userController.deleteUser);

// USER LOGIN
router.post("/login", userController.login);

module.exports = router;
