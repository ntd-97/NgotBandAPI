const express = require("express");
const router = express.Router();

const albumController = require("../controllers/albumController");

// ADD ALBUM
router.post("/", albumController.addAlbum);

// GET ALBUM
router.get("/", albumController.getAlbums);

module.exports = router;
