require("dotenv").config();
const connectDB = require('./config/db');
const taskRoutes = require("./routes/tasks");
const express = require("express");


const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", taskRoutes);


const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);



app.get("/quit", function (req, res) {
  res.send("closing..");
  app.close();
});

connectDB();

// Serve static files from the "public" folder
app.use(express.static('public'));

app.use((req, res) => {
  console.log(`404 Error: Requested URL - ${req.originalUrl}`);
  res.status(404).send('404 Not Found');
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
