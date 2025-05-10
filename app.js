require("dotenv").config();
const connectDB = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const taskRoutes = require("./routes/tasks");
const express = require("express");


const app = express();
const PORT = 3000;

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
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
