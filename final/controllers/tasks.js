const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async (req, res) => {           // This block defines a function named getAllTasks using the asyncWrapper. It retrieves all tasks from the database using Task.find({}) and sends a JSON response containing the tasks with a status code of 200.
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {   // This block defines a function named createTask using the asyncWrapper. It creates a new task in the database using Task.create(req.body) and sends a JSON response containing the created task with a status code of 201 (which signifies a successful resource creation).
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {   // This block defines a function named getTask using the asyncWrapper. It retrieves a task by its ID from the database using Task.findOne({ _id: taskID }). If the task is not found, it uses the next function to pass control to the next middleware (likely an error-handling middleware) with a custom error message and a status code of 404.
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params    // the goal is to obtain the value of a specific parameter from the req.params object.
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
