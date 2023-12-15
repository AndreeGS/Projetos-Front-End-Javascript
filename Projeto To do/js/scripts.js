//Seleção de elemento
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList= document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

const search = document.querySelector("#search");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#erase-button");

const deletar = document.querySelector("remove-todo");

let oldInputValue;

//Funções


const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text;
    todo.appendChild(todoTitle)

    const doneBtn =document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn =document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn =document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML ='<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    if (todos) {
        todos.push(text);
    } 
    else {
        todos = [text]
    }

    localStorage.setItem('todos', JSON.stringify(todos));    
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updatetodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach ((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerHTML == oldInputValue){
            atualizar(text, oldInputValue, () => {
                todoTitle.innerText = text;
                console.log(text, todoTitle);
            });
        }
    })
}

function atualizar(novo, velho, callback){

    let dado = JSON.parse(localStorage.getItem("todos")) || [];
    let found = false;

    try {
            dado.forEach ((item, index) =>{
                if (item === velho){
                    dado[index] = novo;

                    localStorage.setItem("todos", JSON.stringify(dado));
                    console.log("Valor encontrado")
                    callback();
                    return;
                }
            })
        }

    catch {
        if(!found){
            console.log("Erro!")
        }
    }
}

function apagar(valor) {
    let todos = JSON.parse(localStorage.getItem("todos"));

    if (todos) {

        todos = todos.filter(item => item !== valor);

        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function resgate() {
    todos = JSON.parse(localStorage.getItem("todos"))
    
    todoList.innerHTML = "";

    if (todos) {
        todos.forEach((item) => {

            const todo = document.createElement("div")
            todo.classList.add("todo")

            const todoTitle = document.createElement("h3")
            todoTitle.innerText = item;
            todo.appendChild(todoTitle)

            const doneBtn =document.createElement("button")
            doneBtn.classList.add("finish-todo")
            doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
            todo.appendChild(doneBtn)

            const editBtn =document.createElement("button")
            editBtn.classList.add("edit-todo")
            editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
            todo.appendChild(editBtn)

            const deleteBtn =document.createElement("button")
            deleteBtn.classList.add("remove-todo")
            deleteBtn.innerHTML ='<i class="fa-solid fa-xmark"></i>'
            todo.appendChild(deleteBtn);

            todoList.appendChild(todo);

            todoInput.value = "";
        })
    }

    else{
        console.log("Não existe")
    }
}



const searchEl = (text) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      let todoTitle = todo.querySelector("h3");
  
      if (todoTitle.textContent.toLowerCase().includes(text.toLowerCase())) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  };


//Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = todoInput.value;
    if (inputValue){
        saveTodo(inputValue)
    }
});


document.addEventListener("click", (e) =>{
    const targetEl = e.target
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")){
        
        parentEl.remove();
        apagar(todoTitle);
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

       editInput.value = todoTitle
       oldInputValue = todoTitle 
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue){
        updatetodo(editInputValue)
    }
    toggleForms()
})


document.addEventListener('DOMContentLoaded', () =>{
    resgate();
})


searchInput.addEventListener("keyup", (e) => {
    e.preventDefault();
    let inputValue = e.target.value.trim();

    if (inputValue === "") {
        resgate();
    }
    
    else {
        searchEl(inputValue);
        console.log("Elemento:", searchInput.value);
    } 
});