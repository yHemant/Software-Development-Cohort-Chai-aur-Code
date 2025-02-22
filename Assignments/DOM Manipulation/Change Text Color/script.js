const redBtn = document.getElementById('red');
const greenBtn = document.getElementById('green');
const blueBtn = document.getElementById('blue');
const purpleBtn = document.getElementById('purple');
const resetBtn = document.getElementById('reset');
const mainHeading = document.getElementById('main-heading');

redBtn.addEventListener('click', ()=>{
    mainHeading.style.color = 'red';
})
greenBtn.addEventListener('click', ()=>{
    mainHeading.style.color = 'green';
})
blueBtn.addEventListener('click', ()=>{
    mainHeading.style.color = 'blue';
})
purpleBtn.addEventListener('click', ()=>{
    mainHeading.style.color = 'purple';
})
resetBtn.addEventListener('click', ()=>{
    mainHeading.style.color = 'black';
})