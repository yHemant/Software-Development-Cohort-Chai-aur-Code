
function changeBackgroundColor(color){
    document.body.style.backgroundColor = color;
}

const themebutton = document.getElementById('theme');


themebutton.addEventListener('click', () => {
    const currentcolor = document.body.style.backgroundColor;
    if (!currentcolor||currentcolor==='white') {
        changeBackgroundColor('black');
        themebutton.innerText = 'Light Mode'
    }else {
        changeBackgroundColor('white');
        themebutton.innerText = 'Dark Mode'
    }

});