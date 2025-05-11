const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


addBtn.addEventListener("click", function () {
  const taskText = todoInput.value.trim();
  if (taskText !== "") {
    const li = createTaskItem(taskText);
    todoList.appendChild(li);
    todoInput.value = "";
  }
});


fetch("https://jsonplaceholder.typicode.com/todos")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.slice(0, 10).forEach(function (todo) {
      const li = createTaskItem(todo.title, todo.completed);
      todoList.appendChild(li);
    });
  });


function createTaskItem(text, completed = false) {
  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskText.className = "task-text";

  const time = document.createElement("small");
  const now = new Date();
  time.textContent = `Added: ${now.toLocaleString()}`;

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.style.marginRight = "5px";
  doneBtn.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.marginLeft = "5px";
  editBtn.addEventListener("click", function () {
    const newText = prompt("Edit your task:", taskText.textContent);
    if (newText !== null && newText.trim() !== "") {
      taskText.textContent = newText.trim();
    }
  });

  if (completed) {
    li.classList.add("done");
  }

  li.appendChild(taskText);
  li.appendChild(time);
  li.appendChild(doneBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}
