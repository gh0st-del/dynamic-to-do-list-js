document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.forEach((taskText) => addTask(taskText, false));
    }
  
    function addTask(taskText, save = true) {
      const taskEl = document.createElement("li");
      taskEl.textContent = taskText;
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
  
      removeBtn.addEventListener("click", function () {
        taskEl.remove();
        removeTaskFromStorage(taskText);
      });
  
      taskEl.appendChild(removeBtn);
      taskList.appendChild(taskEl);
  
      if (save) {
        saveTaskToStorage(taskText);
      }
    }
  
    function saveTaskToStorage(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  
    function removeTaskFromStorage(taskText) {
      let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks = storedTasks.filter((task) => task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  
    addButton.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Enter a task");
      } else {
        addTask(taskText);
        taskInput.value = "";
      }
    });
  
    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addButton.click();
      }
    });
  
    loadTasks();
  });