const  pictures= [
    {
        url: "https://images.pexels.com/photos/30638768/pexels-photo-30638768/free-photo-of-taj-mahal-at-sunrise-iconic-indian-landmark.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Beauty of Taj Mahal"
    },
    {
        url: "https://images.pexels.com/photos/640781/pexels-photo-640781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Dark Forest in the Mountains"
    },
    {
        url: "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "RiverSide Hut"
    },
    {
        url: "https://images.pexels.com/photos/845242/pexels-photo-845242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        caption: "Teal Blue theme Shop"
    }
]


const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const Reel = document.getElementById('image-reel');
const capText = document.getElementById('cap-text');
const dotsContainer = document.getElementById('dots-container');
const autoplaybtn = document.getElementById('auto-play-btn');
const timer = document.getElementById('timer');
const time = document.getElementById('time');


let index;
let currentIndex = 0;
let isPlaying = false;

leftBtn.addEventListener('click',()=>{
    currentIndex = currentIndex===0 ? pictures.length-1: currentIndex-1;
    previousSlide(currentIndex);
})
rightBtn.addEventListener('click',()=>{
    currentIndex = currentIndex===pictures.length-1 ? 0: currentIndex+1;
    nextSlide(currentIndex);
})

function previousSlide(currInd){
    updateCarousel(currInd)
}
function nextSlide(currInd){
    updateCarousel(currInd)
}

function renderCarousel(){
    pictures.forEach((val, ind)=>{
        const imgDiv = document.createElement('div');
        imgDiv.style.backgroundImage =`url(${val.url})`
        imgDiv.classList.add('img')
        Reel.appendChild(imgDiv) 

        const navDot = document.createElement('div');
        navDot.classList.add('dot')
        navDot.id=ind
        dotsContainer.appendChild(navDot);


        const alldots = document.querySelectorAll('.dot');
        alldots.forEach((item, ind)=>{
            item.addEventListener('click', ()=>{
        currentIndex = ind;
        updateCarousel(currentIndex);
         })
        })
        
    })
}


function updateCarousel(currind){
    const allImg = document.querySelectorAll('.img');
    allImg.forEach((item)=>{
        item.style.transform = `translateX(-${currind*100}%)`
    })
    const alldots = document.querySelectorAll('.dot')
    alldots.forEach((item, ind)=>{
        if(ind===currentIndex){
            item.style.backgroundColor = 'green'
        } else {
            item.style.backgroundColor = 'white'
        }
    })
    capText.innerText = pictures[currind].caption;
}

let autoplayinterval;
let countinterval;
let count;
autoplaybtn.addEventListener('click', ()=>{
    autoplay();
    // displayTimer();
})
function autoplay(){
    if(!isPlaying){
        timer.style.display = 'block'
        displayTimer();
        autoplayinterval = setInterval(()=>{
            currentIndex = (currentIndex+1) % (pictures.length);
            updateCarousel(currentIndex)
            displayTimer();
        },5000)
        isPlaying=true;
        autoplaybtn.innerText = 'Stop Auto Play'
    } else{
        clearInterval(autoplayinterval);
        isPlaying = false;
        autoplaybtn.innerText = 'Start Auto Play'
        updateCarousel(currentIndex)
        clearInterval(countinterval);
        timer.style.display = 'none'
        count = 5;
    }
}
function displayTimer(){
    clearInterval(countinterval);
    count = 5;
    time.innerText =String(count);
    count--
    countinterval = setInterval(() => {
       time.innerText =String(count);
       count--;
       if(count<0){
        clearInterval(countinterval);
       } 
    }, 1000);
}

renderCarousel();
updateCarousel(currentIndex)