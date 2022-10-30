const { Show, TicketType, Ticket } = require("../models/model");

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
      const ticketType = await TicketType.findById(req.params.id);
      const tickets = await Ticket.find({ ticketType: req.params.id });
      if (!ticketType) {
        res
          .status(404)
          .send({ success: false, message: "Ticket type not found" });
      } else if (tickets.length <= 0) {
        // UPDATE AMOUNT SHOW
        const show = await Show.findById(ticketType.show);
        let amount = 0;
        if (req.body.amount) {
          amount = show.amount - ticketType.amount + req.body.amount;
          await show.updateOne({ amount: amount });
        }
        // UPDATE TICKET TYPE
        const updatedTicketType = await TicketType.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json(updatedTicketType);
      } else {
        res
          .status(500)
          .send({
            success: false,
            message: "Can't update this Ticket Type because Ticket was added",
          });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteTicketType: async (req, res) => {
    try {
      // remove ticket type in show and update amount

      const ticketType = await TicketType.findById(req.params.id);
      if (!ticketType) {
        res
          .status(404)
          .send({ success: false, message: "Ticket type not found" });
      } else {
        const show = await Show.findById(ticketType.show);

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
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ticketTypeController;
