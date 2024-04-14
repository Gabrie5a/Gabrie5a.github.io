//Web Dev - CS39548
//Gabriela Cano
//Assignment 6 - Finish the Drum Kit starting files project using javascript and the DOM

const images = ["crash", "kick", "snare", "tom1", "tom2", "tom3", "tom4"];
const sounds = ["crash", "kick-bass", "snare", "tom-1", "tom-2", "tom-3", "tom-4"];
const keys = ["w", "a", "s", "d", "j", "k", "l"];

let btns = document.querySelectorAll("button");

let counter = 0;
for (let btn of btns){
    btn.textContent = ""; 
    btn.value = counter;//assign int to btn.value
    btn.style.backgroundImage = `url(./images/${images[parseInt(btn.value)]}.png)`; //assign img according to btn.value
    btn.style.backgroundSize = "cover";
    btn.addEventListener("click", addNoise); 
    btn.addEventListener("mousedown", removeClass);
    counter++;
}

function addNoise(event){
    let btn = event.currentTarget;
    var audio = new Audio(`./sounds/${sounds[parseInt(btn.value)]}.mp3`); //assign sound according to btn.value
    audio.play();
    btn.classList.toggle("pressed"); //targets element attached
}


function removeClass(event){
    event.currentTarget.classList.toggle("pressed");
}

//when keys are clicked
document.addEventListener("keydown", addKeySound);
document.addEventListener("keyup", removeKeyClass);
function addKeySound(event){
    let index = 0;
    let key = event.key;
    if (keys.includes(key)){
        index = keys.indexOf(key);
        addKeyNoise(index, key);
    }
}

function addKeyNoise(index, key){
    var audio = new Audio(`./sounds/${sounds[index]}.mp3`); //assign sound according to btn.value
    audio.play();
    let btn = document.querySelector(`.${key}`);
    btn.classList.toggle("pressed"); //targets element attached
    console.log(index);
}


function removeKeyClass(event){
    let key = event.key;
    if (keys.includes(key)){
        let btn = document.querySelector(`.${key}`);
        btn.classList.toggle("pressed");
    }
}
