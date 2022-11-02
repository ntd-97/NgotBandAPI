const { Album } = require("../models/model");

const albumController = {
  addAlbum: async (req, res) => {
    try {
      const newAlbum = new Album(req.body);
      const savedAlbum = await newAlbum.save();
      res.status(200).json(savedAlbum);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAlbums: async (req, res) => {
    try {
      const albums = await Album.find();
      res.status(200).json(albums);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = albumController;
