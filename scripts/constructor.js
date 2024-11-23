
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(event) {
    event.preventDefault();

    const taskText = todoInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const listItem = createTaskElement(taskText);
    todoList.appendChild(listItem);

    saveTaskToLocalStorage(taskText);

    todoInput.value = '';
}

function createTaskElement(taskText) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        listItem.remove();
        removeTaskFromLocalStorage(taskText);
    });

    return listItem;
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

todoForm.addEventListener('submit', addTask);

function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    console.log(tasks);
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => {
        const listItem = createTaskElement(taskText);
        todoList.appendChild(listItem);
    });
}
