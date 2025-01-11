import Task from "../models/task.js";
import User from "../models/user.js";

//  Add Task
export const createTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new Task({ title, desc });
    const saveTask = await newTask.save();
    await User.findByIdAndUpdate(id, { $push: { tasks: saveTask._id } });
    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//  Get all tasks
export const getTask = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title, desc });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Favorite
export const updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    await Task.findByIdAndUpdate(id, { important: !taskData.important });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Complete
export const updateCompleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    await Task.findByIdAndUpdate(id, { complete: !taskData.complete });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Important Tasks
export const getImportantTasks = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: data.tasks });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Completed Tasks
export const getCompletedTasks = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: data.tasks });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Incomplete Tasks
export const getIncompleteTasks = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: data.tasks });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
