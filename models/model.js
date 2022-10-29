const mongoose = require("mongoose");

// USER SCHEMA
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  phone: {
    type: String,
    required: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

// TICKET SCHEMA
const ticketSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  ticketType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TicketType",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
  },
});

// TICKET TYPE SCHEMA
const ticketTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: { required: true, type: Number },
  description: { type: String, required: true },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
    required: true,
  },
});

// SHOW SCHEMA
const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: { required: true, type: String },
  description: { required: true, type: String },
  amount: { type: Number, required: true, default: 0 },
  ticketTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketType",
    },
  ],
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

let Ticket = mongoose.model("Ticket", ticketSchema);
let Show = mongoose.model("Show", showSchema);
let TicketType = mongoose.model("TicketType", ticketTypeSchema);
let User = mongoose.model("User", userSchema);

module.exports = { Ticket, Show, TicketType, User };
