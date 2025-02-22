const todoValue = document.getElementById('add-field');
const addBtn = document.getElementById('add-button');
const list = document.getElementById('list-of-items');
const totaltask = document.getElementById('total-task');
const Completedtask = document.getElementById('Completed-task');
const notask = document.getElementById('no-task');

let taskCount = 0;
let taskComplete = 0;

function displayNotask(){
    if(list.children.length===0){
        notask.style.display='block'
    } else{
        notask.style.display='none';
    }
}

addBtn.addEventListener('click', ()=>{
    taskCount++;
    const value =  todoValue.value;
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    const itemText = document.createElement('span')
    const delbtn = document.createElement('button');

    totaltask.innerText = taskCount;
    delbtn.innerText = 'Delete';
    itemText.innerText = value;
    checkbox.type = 'checkbox';
    checkbox.id = 'check-box';
    itemText.id = 'item-text';
    delbtn.id = 'del-btn';
    [checkbox, itemText, delbtn].forEach(element => item.appendChild(element));

    list.appendChild(item);
    todoValue.value = '';

    displayNotask();

    checkbox.addEventListener('change', ()=>{
        if(checkbox.checked){
            taskComplete++
            itemText.style.textDecoration = 'line-through';
            Completedtask.innerText = taskComplete;
        } else {
            taskComplete--
            itemText.style.textDecoration = 'none';
            Completedtask.innerText = taskComplete;
        }
    })

    delbtn.addEventListener('click', ()=>{
        if(checkbox.checked){
        item.remove();
        taskCount--;
        taskComplete--
        Completedtask.innerText = taskComplete;
        totaltask.innerText = taskCount;
        }else {
            item.remove();
        taskCount--;
        totaltask.innerText = taskCount;
        }
        displayNotask();
    })

})