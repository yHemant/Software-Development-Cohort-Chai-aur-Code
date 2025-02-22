const nameField = document.getElementById('name');
const jobField = document.getElementById('job-title');
const ageField = document.getElementById('age');
const bioField = document.getElementById('bio');
const nameReal = document.getElementById('name-Real');
const jobReal = document.getElementById('job-Real');
const ageReal = document.getElementById('age-real');
const bioReal = document.getElementById('bio-real');

nameField.addEventListener('input', ()=>{
    if(document.getElementById('name').value===''){
        nameReal.innerText = 'Not Provided' ;
    }else{
    nameReal.innerText = document.getElementById('name').value;
    }
})
jobField.addEventListener('input', ()=>{
    if(document.getElementById('job-title').value===''){
        jobReal.innerText = 'Not Provided' ;
    }else{
    jobReal.innerText = document.getElementById('job-title').value;
    }
})
ageField.addEventListener('input', ()=>{
    if(document.getElementById('age').value===''){
        ageReal.innerText = 'Not Provided' ;
    }else{
    ageReal.innerText = document.getElementById('age').value;
    }
})
bioField.addEventListener('input', ()=>{
    if(document.getElementById('bio').value===''){
        bioReal.innerText = 'Not Provided' ;
    }else{
    bioReal.innerText = document.getElementById('bio').value;
    }
})