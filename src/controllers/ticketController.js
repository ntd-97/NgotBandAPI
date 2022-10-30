const { User, TicketType, Show, Ticket } = require("../models/model");

const ticketController = {
  addTicket: async (req, res) => {
    try {
      const newTicket = new Ticket(req.body);
      const savedTicket = await newTicket.save();

      // UPDATE SHOW AMOUNT
      const show = await Show.findById(req.body.show);
      const showAmount = show.amount - req.body.amount;
      await show.updateOne({ amount: showAmount });

      // UPDATE TICKET TYPE AMOUNT
      const ticketType = await TicketType.findById(req.body.ticketType);
      const ticketTypeAmount = ticketType.amount - req.body.amount;
      await ticketType.updateOne({ amount: ticketTypeAmount });

      // ADD USER'S TICKET
      await User.findByIdAndUpdate(req.body.user, {
        $push: { tickets: savedTicket._id },
      });

      // ADD SHOW'S TICKET
      await Show.findByIdAndUpdate(req.body.show, {
        $push: { tickets: savedTicket._id },
      });

      res.status(200).json(savedTicket);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUserTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find({ user: req.params.userId }).populate(
        "show ticketType"
      );
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteTicket: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);

      // UPDATE SHOW AMOUNT
      const show = await Show.findById(ticket.show);
      const showAmount = show.amount + ticket.amount;
      await show.updateOne({ amount: showAmount });

      // UPDATE TICKET TYPE AMOUNT
      const ticketType = await TicketType.findById(ticket.ticketType);
      const ticketTypeAmount = ticketType.amount + ticket.amount;
      await ticketType.updateOne({ amount: ticketTypeAmount });

      // ADD USER'S TICKET
      await User.findByIdAndUpdate(ticket.user, {
        $pull: { tickets: ticket._id },
      });

      // ADD SHOW'S TICKET
      await Show.findByIdAndUpdate(ticket.show, {
        $pull: { tickets: ticket._id },
      });

      // DELETE TICKET
      const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedTicket);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ticketController;
