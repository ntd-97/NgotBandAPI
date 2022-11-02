const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");

// ADD MEMBER
router.post("/", memberController.addMember);

// GET MEMBERS
router.get("/", memberController.getMembers);

module.exports = router;
