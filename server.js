const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

// GET tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title required"
        });
    }

    tasks.push({ title });

    res.status(201).json({
        message: "Task Added",
        tasks
    });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {

    tasks = tasks.filter((task, index) =>
        index != req.params.id
    );

    res.json({
        message: "Task Deleted",
        tasks
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});