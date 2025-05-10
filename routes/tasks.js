const express = require("express");
const router = express.Router();
const { getAllTasks } = require("../controllers/taskController"); // We'll create this controller soon
const {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public (or Private if you add auth)
router.get("/", getAllTasks);

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
router.post('/', createTask);

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Public
router.get('/:id', getTaskById);

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
router.put('/:id', updateTask);

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public


module.exports = router;
