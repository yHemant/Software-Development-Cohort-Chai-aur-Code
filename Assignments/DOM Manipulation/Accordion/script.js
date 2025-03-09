const headers = document.querySelectorAll('.headers');
const content = document.querySelectorAll('.content');
const arrow = document.querySelectorAll('.arrow');


content.forEach((cnt) => {
    cnt.style.display = 'none'; // Make sure all contents are hidden initially
});
arrow.forEach((arw) => {
    arw.style.transform = 'rotate(0deg)'; // Set arrows to the default rotation
});


headers.forEach((head, index)=>{
    head.addEventListener('click', ()=>{
        if(content[index].style.display!='none'){
                content.forEach((cnt)=>{
                cnt.style.display = 'none';
                arrow[index].style.transform = 'rotate(0deg)';
            })
        } else {
            content.forEach((cnt)=>{
                cnt.style.display = 'none';
            })
            content[index].style.display = 'block';
            arrow[index].style.transform = 'rotate(180deg)';    
        }
    })
})