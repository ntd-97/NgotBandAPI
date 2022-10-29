const express = require("express");
const router = express.Router();

const showController = require("../controllers/showController");

// ADD SHOW
router.post("/", showController.addShow);

// GET ALL SHOWS
router.get("/", showController.getAllShows);

// GET ONE SHOW
router.get("/:id", showController.getOneShow);

// UPDATE SHOW
router.put("/", showController.updateShow);

// DELETE SHOW
router.delete("/:id", showController.deleteShow);


module.exports = router;