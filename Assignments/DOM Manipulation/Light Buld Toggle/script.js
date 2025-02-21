const toggleBtn = document.getElementById('toggle-btn');
const light = document.getElementById('circle');
const textcolor = document.getElementsByClassName('text');
const status1 = document.getElementById('light-status');


toggleBtn.addEventListener('click', ()=>{
    const circleColor = light.style.backgroundColor;
    if(circleColor==='lightgray'){
        light.style.backgroundColor = 'yellow'
        light.style.boxShadow = '0 0 20px 10px orange';
        light.style.border = 'none'
        toggleBtn.innerText = 'Turn OFF'
        document.body.style.backgroundColor = "#fefe89"
        status1.innerText = 'Status: ON'
        Array.from(textcolor).forEach(element=>{
            element.style.color = 'black';
        })

    } else {
        light.style.backgroundColor = 'lightgray'
        document.body.style.backgroundColor = "#454545"
        light.style.boxShadow = '';
        toggleBtn.innerText = 'Turn ON'
        status1.innerText = 'Status: OFF'
        Array.from(textcolor).forEach(element=>{
            element.style.color = 'white'
        })
    }


})