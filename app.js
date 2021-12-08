// ? SELECTORS!!!
let todoInput = document.querySelector(".todo-input");
let todoList = document.querySelector(".todo-list");
let todoButton = document.querySelector(".todo-button");
let todoOptions = document.querySelector(".todo-filter");

// ? ARROW FUNCTIONS!!!

const inputLength = () => {
  // if (length === 0) no element will be created!!
  return todoInput.value.length;
}

const addListAfterClick = (e) => {
  // !Prevent from natural behaviour
  e.preventDefault(); // ? using this method to prevent function from misbehaving!!
  // Prevent from creating blank task
  if (inputLength() > 0) {
     addTodo();
  }
}

const addTodo = (e) => {
  // !Prevent from natural behaviour // dont put this code here if u want to
  // !prevent from creating blank task :)
  // !e.preventDefault(); //

  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Todo list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
 
  // ? Save to local 
  saveLocalTodo(todoInput.value); 

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  //  Todo Complete button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("completed");
  todoDiv.appendChild(completedButton);

  // Todo Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"><i/>`;
  trashButton.classList.add("trash");
  todoDiv.appendChild(trashButton);

  // Attaching Final
  todoList.appendChild(todoDiv);
}

const trashTodo = (e) => {
  let item = e.target;

  if (item.classList[0] === "trash") {
    // ? e.target.parentElement.remove() //
    const todo = item.parentElement;
    todo.classList.add("fall");
    // ? Remove from local
    removeLocalTodo(todo);
    // ParentElement get removed after animation end!!
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
  if (item.classList[0] === "completed") {
    const todo = item.parentElement;
    todo.classList.toggle("taskCompleted");
    console.log(todo);
  }
}

// TODO: TODO-FILTER && LOCAL STORAGE SAVE CONFIGRATION

const todoFilter = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
           if (todo.classList.contains("taskCompleted")) {
               todo.style.display = "flex";
           } else {
               todo.style.display = "none";
           }
           break;
           case "uncompleted":
            if (!todo.classList.contains("taskCompleted")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        }
    });
}

 // FIXME: make it work on firefox browser!!

// Save todos list to local storage
const saveLocalTodo = (todo) => {
  //Check--- Do I already have thing in there??
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove from local storage
const removeLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ? EVENT LISTENERS!!!
todoButton.addEventListener("click", addListAfterClick);
todoList.addEventListener("click", trashTodo);
todoOptions.addEventListener('click', todoFilter);

