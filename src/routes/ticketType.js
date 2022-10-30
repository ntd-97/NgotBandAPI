const express = require("express");
const router = express.Router();

const ticketTypeController = require("../controllers/ticketTypeController");

// ADD TICKET TYPE
router.post("/", ticketTypeController.addTicketType);

// UPDATE TICKET TYPE
router.put("/:id", ticketTypeController.updateTicketType);

// DELETE TICKET TYPE
router.delete("/:id", ticketTypeController.deleteTicketType);

module.exports = router;
