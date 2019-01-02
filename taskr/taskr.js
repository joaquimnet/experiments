// DOM
const form = document.querySelector("#task-form"); // form
const taskList = document.querySelector(".collection"); // ul
const clearBtn = document.querySelector(".clear-tasks"); // button
const filter = document.querySelector("#filter"); // input
const taskInput = document.querySelector("#task"); // input

// Store in local storage
const storeTaskInLocalStorage = newTask => {
  let tasks;
  if (localStorage.getItem("taskr.tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("taskr.tasks"));
  }
  tasks.push(newTask);
  localStorage.setItem("taskr.tasks", JSON.stringify(tasks));
};

// Remove from local storage
const removeFromLocalStorage = taskItem => {
  let tasks;
  if (localStorage.getItem("taskr.tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("taskr.tasks"));
  }
  tasks.forEach((task, i) => {
    if (taskItem.textContent === task) {
      tasks.splice(i,1);
    }
  });
  localStorage.setItem("taskr.tasks", JSON.stringify(tasks));
}

// Clear storage
const clearTasksFromLocalStorage = () => {
  localStorage.removeItem("taskr.tasks");
}

// Load Event Listeners
const loadEventListeners = () => {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", () => {
    let tasks;
    if (localStorage.getItem("taskr.tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("taskr.tasks"));
    }
    tasks.forEach(task => {
      // Creating li element
      const li = document.createElement("LI");
      const text = document.createTextNode(task);
      li.className = "collection-item";
      li.appendChild(text);

      // Delete link
      const del = document.createElement("A");
      del.className = "delete-item secondary-content red-text";
      del.innerHTML = "<i class='fas fa-times red-text'></i>";
      del.setAttribute("href", "#!");
      li.appendChild(del);

      // Add to list
      taskList.appendChild(li);

      // Focus the task input
      taskInput.focus();
    });
  });

  // Add Task event
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (taskInput.value === "") {
      alert("Add a task");
      return;
    }

    // Creating li element
    const li = document.createElement("LI");
    const text = document.createTextNode(taskInput.value);
    li.className = "collection-item";
    li.appendChild(text);

    // Delete link
    const del = document.createElement("A");
    del.className = "delete-item secondary-content red-text";
    del.innerHTML = "<i class='fas fa-times red-text'></i>";
    del.setAttribute("href", "#!");
    li.appendChild(del);

    // Add to list
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    
    // Focus the task input
    taskInput.focus();
    taskInput.value = "";
  });

  // Remove Task Event
  taskList.addEventListener("click", e => {
    if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are you sure?")) {
        e.target.parentElement.parentElement.remove();

        // Remove from local storage
        removeFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
  });

  // Clear tasks event
  clearBtn.addEventListener("click", e => {
    if (confirm("Are you sure?")) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
      clearTasksFromLocalStorage();
    }
  });

  // Filter Event
  filter.addEventListener("keyup", e => {
    const text = e.target.value.toLowerCase();
    //console.log(text);
    document.querySelectorAll(".collection-item").forEach(task => {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  });
};

loadEventListeners();
