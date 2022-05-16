// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
console.log(addTodo);

// Functions

function addTodo(event) {
  // Prevent Form from submitting
  event.preventDefault();
  // To Do Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Add ToDo To LocalStorage
  saveLocalTodos(todoInput.value);
  // check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = ` <i class='fas fa-check'></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Trash check button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = ` <i class='fas fa-trash'> </i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // Append To List
  todoList.appendChild(todoDiv);
  // clear ToDo Input Value
  todoInput.value = "";
}

// Phase two; after adding , we want to add event to delete or mark it as a complete
todoList.addEventListener("click", deleteCheck);

function deleteCheck(e) {
  // console.log(e.target);

  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", (eo) => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Filter Options

const filterOption = document.querySelector(".filter-todo");
filterOption.addEventListener("click", filterTodo);

function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
// Save to Local Storage
function saveLocalTodos(todo) {
  // check --> hey do i already have rging in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check --> hey do i already have rging in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // To Do Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create Li
    const newTodo = document.createElement("li");
    // after adding this code to getTodo we become don't need it
    // newTodo.innerText = todoInput.value
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = ` <i class='fas fa-check'></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash check button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = ` <i class='fas fa-trash'> </i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append To List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // check --> hey do i already have rging in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Mine

