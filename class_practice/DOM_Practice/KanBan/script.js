const addButton = document.getElementById('add-btn');
const todoboard = document.getElementById('to-do-board');

addButton.addEventListener('click',()=>{
    const input = prompt('Enter the todo item');
    if(!input) return
    const item = document.createElement('p');
    item.innerText = input;
    item.setAttribute('draggable', true)
    item.classList.add('item');
    item.addEventListener('dragstart', ()=>{
        item.classList.add('flying');
    })
    item.addEventListener('dragend', ()=>{
        item.classList.remove('flying');
    })
    todoboard.appendChild(item); 
})

const boards = document.querySelectorAll('.board');


boards.forEach((board) => {
    board.addEventListener('dragover', () => {
        const flyingItem = document.querySelector('.flying');
        board.appendChild(flyingItem);
    })
});