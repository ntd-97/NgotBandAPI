const { Show, TicketType, Ticket } = require("../models/model");

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
      res.status(200).json(shows);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOneShow: async (req, res) => {
    try {
      const show = await Show.findById(req.params.id).populate("ticketTypes");
      res.status(200).json(show);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateShow: async (req, res) => {
    try {
      const show = await Show.findById(req.params.id);
      if (!show) {
        res.status(404).send({ success: false, message: "Show not found" });
      } else {
        const updatedShow = await Show.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json(updatedShow);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteShow: async (req, res) => {
    try {
      const show = await Show.findById(req.params.id);
      const tickets = await Ticket.find({ show: req.params.id });
      const ticketTypes = await TicketType.find({ show: req.params.id });
      if (!show) {
        res.status(404).send({ success: false, message: "Show not found" });
      } else {
        if (tickets.length === 0 && ticketTypes === 0) {
          const { ticketTypes } = await Show.findById(req.params.id);
          ticketTypes.forEach(async (ticketType) => {
            await TicketType.findByIdAndDelete(ticketType);
          });
          const deletedShow = await Show.findByIdAndDelete(req.params.id);
          res.status(200).json(deletedShow);
        } else {
          res.status(404).send({
            success: false,
            message:
              "delete tickets, ticket types of this show before delete this show",
          });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = showController;
