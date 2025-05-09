require("dotenv").config();
const connectDB = require('./config/db');

const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  // Using send function we send
  // response to the client
  // Here we are sending html
  res.send("<h1> Hello World! </h1>");
});

app.get("/quit", function (req, res) {
  res.send("closing..");
  app.close();
});

connectDB();

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
