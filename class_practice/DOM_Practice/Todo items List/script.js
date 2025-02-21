const todoInput = document.getElementById('todo-Input');
const addBtn = document.getElementById('add-button');
const todoItemsContainer = document.getElementById('todo-items-container');

addBtn.addEventListener('click', ()=>{
    const value = todoInput.value;

    const item = document.createElement('li');
    item.innerText=value;

    const delbtn = document.createElement('button');
    delbtn.innerText='X'
    item.appendChild(delbtn);

    todoItemsContainer.appendChild(item);

    todoInput.value=''
    delbtn.addEventListener('click',()=>{
        item.remove();
    })
})
