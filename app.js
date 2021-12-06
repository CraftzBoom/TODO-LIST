// ? SELECTORS!!!
let todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list');
let todoButton = document.querySelector('.todo-button');


// ? ARROW FUNCTIONS!!!

const inputLength = () => {
    // if (length === 0) no element will be created!!
    return todoInput.value.length; 
}

const addListAfterClick = (e) => {
    // !Prevent from natural behaviour 
    e.preventDefault(); // ? using this method to prevent function from misbehaving!!
    // Prevent from creating blank task
    if(inputLength() > 0) {
        addTodo();    
    }
}

const addTodo = (e) => {
    // !Prevent from natural behaviour // dont put this code here if u want to 
    // !prevent from creating blank task :)
    // !e.preventDefault(); //

    // Todo div  
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo',);
    // Todo list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    
    //  Todo Complete button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('completed');
    todoDiv.appendChild(completedButton);
    
    // Todo Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"><i/>`;
    trashButton.classList.add('trash');
    todoDiv.appendChild(trashButton);
    
    // Attaching Final 
    todoList.appendChild(todoDiv);
}

const trashTodo = (e) => {
     let item = e.target;

    if(item.classList[0] === 'trash') {
        // ? e.target.parentElement.remove() //
        const todo = item.parentElement;
        todo.classList.add('fall');
        // ParentElement get removed after animation end!!
        todo.addEventListener('transitionend', (e) => {
            todo.remove();
        });
    }
    if(item.classList[0] === "completed") {
        const todo = item.parentElement;
        todo.classList.toggle('taskCompleted');
        console.log(todo);
    }
}


// ? EVENT LISTENERS!!!
todoButton.addEventListener('click',addListAfterClick);
todoList.addEventListener('click', trashTodo);
