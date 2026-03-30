const express = require('express');
const router = express.Router();

// In-memory data
let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build API", completed: false }
];

// GET all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET single task
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
});

// CREATE task
router.post('/', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);
  res.json(newTask);
});

// UPDATE task
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).send("Task not found");

  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

// DELETE task
router.delete('/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.send("Task deleted");
});

module.exports = router;
