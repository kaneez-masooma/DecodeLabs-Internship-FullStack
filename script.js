const API = "http://localhost:5000/tasks";

// Load tasks
async function loadTasks() {

    const response = await fetch(API);

    const tasks = await response.json();

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        list.innerHTML += `
            <li>
                ${task.title}
                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </li>
        `;
    });
}

// Add task
async function addTask() {

    const input = document.getElementById("taskInput");

    const title = input.value;

    if(title === ""){
        alert("Enter task");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    input.value = "";

    loadTasks();
}

// Delete task
async function deleteTask(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();