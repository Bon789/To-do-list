const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  createTaskElement(task);
  saveTaskToLocalStorage(task);

  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task";
  li.dataset.id = task.id;

  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span onclick="toggleComplete(${task.id})"> ${task.text}</span>
    <button class="delete-btn" onclick="deleteTask(${task.id}, this)">🗑️</button>
  `;

  taskList.appendChild(li);
}

function toggleComplete(id) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.querySelector(`li[data-id="${id}"]`).classList.toggle("completed");
}

function deleteTask(id, button) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  button.parentElement.style.animation = "slideIn 0.4s reverse";
  setTimeout(() => button.parentElement.remove(), 400);
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => createTaskElement(task));
}

function getTasksFromLocalStorage() {
  return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
}

function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
