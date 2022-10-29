const { Show, TicketType } = require("../models/model");

const ticketTypeController = {
  addTicketType: async (req, res) => {
    try {
      const newTicketType = new TicketType(req.body);
      const savedTicketType = await newTicketType.save();
      if (req.body.show) {
        const show = await Show.findById(req.body.show);
        const amount = show.amount + req.body.amount;
        await show.updateOne({
          $push: { ticketTypes: savedTicketType._id },
          amount: amount,
        });
      }
      res.status(200).json(savedTicketType);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateTicketType: async (req, res) => {
    try {
      // update amount show
      const ticketType = await TicketType.findById(req.body.id);
      const show = await Show.findById(ticketType.show);
      const amount = show.amount - ticketType.amount + req.body.amount;
      await show.updateOne({ amount: amount });
      // update ticket type
      const updatedTicketType = await TicketType.findByIdAndUpdate(
        req.body.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json(updatedTicketType);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteTicketType: async (req, res) => {
    try {
      // remove ticket type in show and update amount
      const { show: showId } = await TicketType.findById(req.params.id);

      const ticketType = await TicketType.findById(req.params.id);
      const show = await Show.findById(showId);

      const amount = show.amount - ticketType.amount;

      await show.updateOne({
        $pull: { ticketTypes: req.params.id },
        amount: amount,
      });
      // delete ticket type
      const deletedTicketType = await TicketType.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json(deletedTicketType);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ticketTypeController;
