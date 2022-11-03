require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");

const showRoute = require("./routes/show");
const ticketTypeRoute = require("./routes/ticketType");
const userRoute = require("./routes/user");
const ticketRoute = require("./routes/ticket");
const commonInfoRoute = require("./routes/commonInfo");
const memberRoute = require("./routes/member");
const albumRoute = require("./routes/album");

// MONGODB CONNECTION
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// EXPRESS
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("common"));

// ROUTES
app.use("/api/show", showRoute);
app.use("/api/ticketType", ticketTypeRoute);
app.use("/api/user", userRoute);
app.use("/api/ticket", ticketRoute);
app.use("/api/commonInfo", commonInfoRoute);
app.use("/api/member", memberRoute);
app.use("/api/album", albumRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Started`);
});
