import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getCompletedTasks,
  getImportantTasks,
  getTask,
  updateCompleteTask,
  updateFavorite,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

// Create Task
router.post("/create-task", authenticateToken, createTask);

// Get All Tasks
router.get("/get-all-tasks", authenticateToken, getTask);

// Delete Task
router.delete("/delete-task/:id", authenticateToken, deleteTask);

// Update Task
router.put("/update-task/:id", authenticateToken, updateTask);

// Update Important Task
router.put("/update-imp-task/:id", authenticateToken, updateFavorite);

// Update Complete Task
router.put("/update-complete-task/:id", authenticateToken, updateCompleteTask);

// Get Important Tasks
router.get("/get-imp-tasks", authenticateToken, getImportantTasks);

// Get Completed Tasks
router.get("/get-complete-tasks", authenticateToken, getCompletedTasks);

// Get Incomplete Tasks
router.get("/get-incomplete-tasks", authenticateToken, getImportantTasks);

export default router;
