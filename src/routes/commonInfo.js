const express = require("express");
const router = express.Router();

const commonInfoController = require("../controllers/commonInfoController");

// ADD COMMON INFO
router.post("/", commonInfoController.addCommonInfo);

// GET COMMON INFO
router.get("/", commonInfoController.getCommonInfo);

module.exports = router;
