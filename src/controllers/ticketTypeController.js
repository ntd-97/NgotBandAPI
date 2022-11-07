const { Show, TicketType, Ticket } = require("../models/model");

const ticketTypeController = {
  addTicketType: async (req, res) => {
    try {
      const newTicketType = new TicketType(req.body);
      if (req.body.show) {
        const show = await Show.findById(req.body.show);
        if (show) {
          const savedTicketType = await newTicketType.save();
          const amount = show.amount + req.body.amount;
          await show.updateOne({
            $push: { ticketTypes: savedTicketType._id },
            amount: amount,
          });
          res.status(200).json(savedTicketType);
        } else {
          res
            .status(404)
            .send({ success: false, message: "Show không tồn tại" });
        }
      } else {
        res.status(404).send({ success: false, message: "Không tìm thấy show" });
      }
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
          .send({ success: false, message: "Không tìm thấy loại vé" });
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
        res.status(500).send({
          success: false,
          message: "Không thể cập nhật loại vé vì vé đã được thêm",
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
      const tickets = await Ticket.find({ ticketType: req.params.id });
      if (!ticketType) {
        res
          .status(404)
          .send({ success: false, message: "Không tìm thấy loại vé" });
      } else {
        if (tickets.length === 0) {
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
        } else {
          res.status(404).send({
            success: false,
            message:
              "Xóa vé đã thêm của loại vé trước khi xóa loại vé",
          });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ticketTypeController;
