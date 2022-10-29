require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");

const showRoute = require("./routes/show");
const ticketTypeRoute = require("./routes/ticketType");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(cors);
app.use(morgan("common"));

// ROUTES
app.use("/api/show", showRoute);
app.use("/api/ticketType", ticketTypeRoute);
// app.get("/", (req, res) => {
//   res.send("API");
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});


module.exports = app;