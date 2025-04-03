let draggedCard = null;
let rightClickedCard = null;

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

function addTask(columnId){
    const input = document.getElementById(`${columnId}-input`);
    const TaskText = input.value.trim();

    if(TaskText=== ""){
        return;
    }
    
    const textDate = new Date().toLocaleString();
    const taskELement = createTaskElement(TaskText, textDate);

    document.getElementById(`${columnId}-tasks`).appendChild(taskELement);
    updateTasksCount(columnId);
    saveTasksToLocalStorage(columnId, TaskText, textDate)
    input.value = ""
}

function createTaskElement(TaskText, textDate){
    const taskElement = document.createElement("div");
    taskElement.innerHTML = `<span>${TaskText}</span></br><small class="time">${textDate}</small>`;
    taskElement.classList.add('card');
    taskElement.setAttribute('draggable', true);
    taskElement.addEventListener('dragstart', dragStart);
    taskElement.addEventListener('dragend', dragEnd);
    taskElement.addEventListener('contextmenu', function (evt){
        evt.preventDefault();
        rightClickedCard =  this;
        showContextMenu(evt.pageX, evt.pageY);
    })
    return taskElement;
}

function dragStart(){
    setTimeout(() => {
        this.classList.add('dragging');
    }, 0);
    draggedCard = this;
}
function dragEnd(){
    this.classList.remove('dragging');
    draggedCard = null;
    ["todo", "doing", "done"].forEach((columnId)=>{
        updateLocalStorage();
        updateTasksCount(columnId);
    })
}

const columns = document.querySelectorAll('.column .tasks');
columns.forEach((column)=>{
    column.addEventListener('dragover', dragOver)
})

function dragOver(event){
    event.preventDefault();
    draggedCard = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(this, event.pageY);
    if(afterElement===null){
        this.appendChild(draggedCard);
    } else {
        this.insertBefore(draggedCard, afterElement);
    }
}

function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll(".card:not(.dragging)")];
    const result = draggableElements.reduce(
        (closestElementUnderMouse, currentTask)=>{
            const box = currentTask.getBoundingClientRect();
            const offset = y - (box.top + box.height / 2);
            if (offset<0 && offset> closestElementUnderMouse.offset) {
                return {offset: offset, element: currentTask};
            } else {
                return closestElementUnderMouse;
            }
        }, {offset: Number.NEGATIVE_INFINITY}
    );
    return result.element;
}


const contextmenu = document.querySelector(".context-menu");

function showContextMenu(x, y){
    contextmenu.style.left = `${x}px`;
    contextmenu.style.top = `${y}px`;
    contextmenu.style.display = "block";
}

document.addEventListener("click", ()=>{
    contextmenu.style.display = "none";
})

function editTask(){
    if(rightClickedCard !== null){
        const newTaskText = prompt("Edit task - ", rightClickedCard.textContent);
        if(newTaskText!==""){
            rightClickedCard.textContent = newTaskText;
        }
    }
    updateLocalStorage();
}

function deleteTask(){
    if(rightClickedCard!==null){
        rightClickedCard.remove();
        ["todo", "doing", "done"].forEach((columnId)=>{
            updateTasksCount(columnId);
        })
    }
    updateLocalStorage();
}

function updateTasksCount(columnId){
    const count = document.querySelectorAll(`#${columnId}-tasks .card`).length;
    document.getElementById(`${columnId}-count`).textContent = count;
}

function saveTasksToLocalStorage(columnId, taskText, taskDate){
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.push({text: taskText, date: taskDate});
    localStorage.setItem(columnId, JSON.stringify(tasks));
    console.log("loading done")
}

function loadTasksFromLocalStorage(){
    ["todo", "doing", "done"].forEach((columnId)=>{
        const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
        tasks.forEach(({text, date})=>{
            const taskELement = createTaskElement(text, date);
            document.getElementById(`${columnId}-tasks`).appendChild(taskELement);
        })
        updateTasksCount(columnId);
    })
}

function updateLocalStorage(){
    ["todo", "doing", "done"].forEach((columnId)=>{
        const tasks = [];
        document.querySelectorAll(`#${columnId}-tasks .card`).forEach((card)=>{
            const taskText = card.querySelector("span").textContent;
            const taskDate = card.querySelector("small").textContent;
            tasks.push({ text: taskText, date: taskDate});
        })
        localStorage.setItem(columnId, JSON.stringify(tasks));
    })
}