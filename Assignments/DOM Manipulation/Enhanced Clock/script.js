const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digitalClock = document.getElementById('digital-clock');
const thisday = document.getElementById('date');



function updateClock(){
    const currentDate = new Date();
    const seconds = currentDate.getSeconds();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();

    const opday = { weekday: 'long'}
    const opmonth = { month: 'long'}
    const day = currentDate.toLocaleDateString('en-US', opday)
    const date = currentDate.getDate();
    const month = currentDate.toLocaleDateString('en-US', opmonth)
    const year = currentDate.getFullYear();

    thisday.innerText = `${day} ${date.toString()} ${month} ${year.toString()}`;


    secondHand.style.transform = `rotate(${seconds * 6}deg)`;
    minuteHand.style.transform = `rotate(${(minutes*6 + seconds * 0.1)}deg)`;
    hourHand.style.transform = `rotate(${(hours*30 + minutes*0.5 + seconds * (1/120))}deg)`;

    const second = seconds<10 ? `0${String(seconds)}` : String(seconds);
    const minute = minutes<10 ? `0${String(minutes)}` : String(minutes);
    const halfHour = hours%12 || 12 ;
    const hour = (halfHour%12 || 0)<10 ? `0${String(halfHour)}` : String(halfHour);

    const ampm = hours<12 ? "AM" : "PM";

    digitalClock.innerText = `${hour}:${minute}:${second} ${ampm}`
    setInterval(()=>{
        
        const currentDate = new Date();
        
        
        const seconds = currentDate.getSeconds();
        const minutes = currentDate.getMinutes();
        const hours = currentDate.getHours();
        
        
        secondHand.style.transform = `rotate(${seconds * 6}deg)`;
        minuteHand.style.transform = `rotate(${(minutes*6 + seconds * 0.1)}deg)`;
        hourHand.style.transform = `rotate(${(hours*30 + minutes*0.5 + seconds * (1/120))}deg)`;
        
        
        const second = seconds<10 ? `0${String(seconds)}` : String(seconds);
        const minute = minutes<10 ? `0${String(minutes)}` : String(minutes);
        const halfHour = hours%12 || 12 ;
        const hour = (halfHour%12 || 0)<10 ? `0${String(halfHour)}` : String(halfHour);
    
        digitalClock.innerText = `${hour}:${minute}:${second} ${ampm}`


        const opday = { weekday: 'long'}
    const opmonth = { month: 'long'}
    const day = currentDate.toLocaleDateString('en-US', opday)
    const date = currentDate.getDate();
    const month = currentDate.toLocaleDateString('en-US', opmonth)
    const year = currentDate.getFullYear();

    thisday.innerText = `${day} ${date.toString()} ${month} ${year.toString()}`;
        
    },1000)
}

updateClock();