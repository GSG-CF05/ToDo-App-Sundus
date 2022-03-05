// Get Elements form Html
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let listTasks = document.querySelector(".tasks");

let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getTasksFromLocalStorage();
//Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

listTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    console.log("edit");
  }
  if (e.target.classList.contains("delete")) {
    deleteTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );

    e.target.parentElement.parentElement.remove();
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    isDone: false,
  };

  arrayOfTasks.push(task);

  displayTask(arrayOfTasks);
  setTasksOnLocalStorage(arrayOfTasks);
}

function displayTask(arr) {
  listTasks.innerHTML = " ";
  arr.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.isDone) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let ulButtons = document.createElement("ul");
    div.appendChild(ulButtons);
    let liEdit = document.createElement("li");
    liEdit.className = "edit";
    liEdit.appendChild(document.createTextNode("Edit"));
    let liDel = document.createElement("li");
    liDel.className = "delete";
    liDel.appendChild(document.createTextNode("Delete"));
    ulButtons.appendChild(liEdit);
    ulButtons.appendChild(liDel);

    listTasks.appendChild(div);
  });
}

function setTasksOnLocalStorage(arr) {
  window.localStorage.setItem("tasks", JSON.stringify(arr));
}

function getTasksFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    displayTask(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  setTasksOnLocalStorage(arrayOfTasks);
}
