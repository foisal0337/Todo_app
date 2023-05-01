
const express = require("express");
const router = express.Router();
const {createTask , getTask, getTasks , updateTask , deleteTask} = require("../controller/taskController.js");

// Create a new task
router.post("/", createTask);

// Retrieve all tasks
router.get("/", getTasks);

// Retrieve a single task by ID
router.get("/:id", getTask);

// Update a task by ID
router.put("/:id", updateTask);

// Delete a task by ID
router.delete("/:id", deleteTask);

module.exports = router;