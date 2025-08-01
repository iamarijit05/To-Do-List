window.onload = function () {
  loadTasks();
};

function addTask(event) {
  event.preventDefault();

  const taskInput = document.getElementById("taskInput");
  const tasktext = taskInput.value.trim();

  if (tasktext === "") return;
  const li = document.createElement("li");
  li.innerHTML = `<span onclick="toggleComplete(this)">${tasktext} </span><button onclick="deleteTask(this)">Delete</button>`;
  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";

  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function toggleComplete(span) {
  span.classList.toggle("completed");
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const span = li.querySelector("span");
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed"),
    });
  });
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("todoTasks");
  if (!saved) return;

  const tasks = JSON.parse(saved);
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
         <span onclick="toggleComplete(this)" class="${
           task.completed ? "completed" : ""
         }">
        ${task.text}
      </span>
      <button onclick="deleteTask(this)">Delete</button>
        `;
        document.getElementById("taskList").appendChild(li);
  });
}
