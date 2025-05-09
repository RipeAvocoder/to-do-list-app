const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
    trim: true, // Removes whitespace from both ends
  },
  description: {
    type: String,
    required: false, // Description is optional
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false, // New tasks are not completed by default
  },
  createdAt: {
    type: Date,
    default: Date.now, // Sets the creation date automatically
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
