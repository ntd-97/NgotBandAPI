const { Show, TicketType } = require("../models/model");

const showController = {
  addShow: async (req, res) => {
    try {
      const newShow = new Show(req.body);
      const savedShow = await newShow.save();
      res.status(200).json(savedShow);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllShows: async (req, res) => {
    try {
      const shows = await Show.find();
      if (!shows || shows.length <= 0) res.status(404).send("Shows Not found");
      res.status(200).json(shows);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOneShow: async (req, res) => {
    try {
      const show = await Show.findById(req.params.id).populate("ticketTypes");
      if (!show) res.status(404).send("Show Not found");
      res.status(200).json(show);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateShow: async (req, res) => {
    try {
      const show = await Show.findById(req.body.id);
      if (!show) res.status(404).send("Show Not found");
      const updatedShow = await Show.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(updatedShow);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteShow: async (req, res) => {
    try {
      const show = await Show.findById(req.params.id);
      if (!show) res.status(404).send("Show Not found");
      const { ticketTypes } = await Show.findById(req.params.id);
      ticketTypes.forEach(async (ticketType) => {
        await TicketType.findByIdAndDelete(ticketType);
      });
      const deletedShow = await Show.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedShow);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = showController;
