const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");

// @desc    Get all tasks
// @route   GET /api/tasks

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({success: true, count: tasks.length, data: tasks });
  }
  catch (error) {
    res.status(500).json({ success: false, error: "Server error: " + error.message });
  }
}

// @desc    Create a new task
// @route   POST /api/tasks

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Please provide a title' });
    }
    const task = await Task.create({ title, description });
    res.status(201).json({ success: true, data: task });
  }
  catch {
    res.status(400).json({ success: false, error: "Bad request" });
  }
}

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  }
  catch (error) {
    res.status(500).json({ success: false, error: "Server error: " + error.message });
  }
}

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    if (title !== undefined && title.trim() === "") {
      // If title is provided but is empty
      return res
        .status(400)
        .json({ success: false, error: "Title cannot be empty" });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res
        .status(400)
        .json({
          success: false,
          error: "Completed status must be true or false",
        });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document rather than the original
      runValidators: true // Run schema validators on update
    });

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid Task ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    await task.deleteOne(); // or Task.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, data: {} }); // Or a message like { message: 'Task removed' }
  } catch (error) {
     if (error.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid Task ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + error.message });
  }
};


// module.exports = {
// getAllTasks,
// createTask,
// getTaskById,
// updateTask,
// deleteTask};
