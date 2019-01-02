// DOM
const form = document.querySelector("#task-form"); // form
const taskList = document.querySelector(".collection"); // ul
const clearBtn = document.querySelector(".clear-tasks"); // button
const filter = document.querySelector("#filter"); // input
const taskInput = document.querySelector("#task"); // input

// Load Event Listeners
const loadEventListeners = () => {
  // Task event
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (taskInput.value === "") {
      alert("Add a task");
      return;
    }

    // Creating li element
    const li = document.createElement("LI");
    li.className = "collection-item";
    const text = document.createTextNode(taskInput.value);
    li.appendChild(text);

    // Delete link
    const del = document.createElement("A");
    del.className = "delete-item secondary-content red-text";
    del.innerHTML = "<i class='fas fa-times red-text'></i>";
    del.setAttribute("href", "#!");
    li.appendChild(del);

    // Add to list
    taskList.appendChild(li);

  });
};

loadEventListeners();
