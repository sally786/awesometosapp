require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  task: String,
  status: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

app.use(express.json());
app.use(cors());

// Task routes
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task({ task: req.body.task });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
});

app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
