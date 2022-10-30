const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");

// ADD TICKET
router.post("/", ticketController.addTicket);

// GET ALL TICKETS OF USER
router.get("/:userId", ticketController.getAllUserTickets);

// GET ALL TICKETS OF USER
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
