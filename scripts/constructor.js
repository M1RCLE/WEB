const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = todoInput.value.trim();
    if (!taskText) return;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="mark-done">Mark as Done</button>
    `;

    todoList.appendChild(listItem);
    todoInput.value = '';

    listItem.querySelector('.mark-done').addEventListener('click', function () {
        listItem.classList.toggle('done');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-item .nav-link");
    const currentPath = document.location.pathname;
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const todoList = document.getElementById("todo-list");
    const clearCompletedButton = document.getElementById("clear-completed");

    // Load tasks from localStorage on page load
    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
        savedTasks.forEach(task => {
            createTaskElement(task.text, task.done);
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = Array.from(todoList.querySelectorAll("li")).map(item => ({
            text: item.querySelector("span").textContent,
            done: item.classList.contains("done")
        }));
        localStorage.setItem("todoTasks", JSON.stringify(tasks));
    };

    // Create a new task element
    const createTaskElement = (taskText, isDone = false) => {
        const listItem = document.createElement("li");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        const markDoneButton = document.createElement("button");
        markDoneButton.textContent = "Mark as Done";
        markDoneButton.classList.add("mark-done");

        // Mark task as done or toggle back to undone
        markDoneButton.addEventListener("click", () => {
            listItem.classList.toggle("done");
            saveTasks(); // Save changes to localStorage
        });

        if (isDone) {
            listItem.classList.add("done");
        }

        listItem.appendChild(taskSpan);
        listItem.appendChild(markDoneButton);
        todoList.appendChild(listItem);
    };

    // Add a new task to the list
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        createTaskElement(taskText);
        saveTasks(); // Save the new task to localStorage
        taskInput.value = ""; // Clear the input field
    });

    // Clear completed tasks only
    clearCompletedButton.addEventListener("click", () => {
        const tasks = todoList.querySelectorAll("li");
        tasks.forEach(task => {
            if (task.classList.contains("done")) {
                task.remove(); // Remove only completed tasks
            }
        });
        saveTasks(); // Save the updated list to localStorage
    });

    // Initialize the to-do list
    loadTasks();
});
