//Web Dev - CS39548
//Gabriela Cano
//Assignment 6 - Finish the Drum Kit starting files project using javascript and the DOM

//lists of all images, sounds & keys (index match for all lists)
const images = ["crash", "kick", "snare", "tom1", "tom2", "tom3", "tom4"];
const sounds = ["crash", "kick-bass", "snare", "tom-1", "tom-2", "tom-3", "tom-4"];
const keys = ["w", "a", "s", "d", "j", "k", "l"];

let btns = document.querySelectorAll("button");
let counter = 0;
for (let btn of btns){
    btn.textContent = ""; //remove buttton letter
    btn.value = counter; //assign int to btn.value
    btn.style.backgroundImage = `url(./images/${images[parseInt(btn.value)]}.png)`; //assign img according to btn.value
    btn.style.backgroundSize = "cover"; 
    btn.addEventListener("click", addNoise); 
    btn.addEventListener("mousedown", removePress);
    counter++;
}

function addNoise(event){
    let btn = event.currentTarget; //targets element attached to event
    var audio = new Audio(`./sounds/${sounds[parseInt(btn.value)]}.mp3`); //assign sound according to btn.value
    audio.play();
    btn.classList.toggle("pressed"); //add pressed class
}


function removePress(event){
    event.currentTarget.classList.toggle("pressed"); //remove pressed class
}

//add sound functionality when corresponding keys are pressed
document.addEventListener("keydown", addKeySound);
document.addEventListener("keyup", removeKeyPress);
function addKeySound(event){
    let index = 0;
    let key = event.key;
    if (keys.includes(key)){ //if key pressed is a valid key
        index = keys.indexOf(key); //get index of the key in the list
        addKeyNoise(index, key);
    }
}

function addKeyNoise(index, key){
    var audio = new Audio(`./sounds/${sounds[index]}.mp3`); //assign sound according to index 
    audio.play();
    let btn = document.querySelector(`.${key}`); //get the element that has the same class as key
    btn.classList.toggle("pressed"); //add pressed classs
}


function removeKeyPress(event){
    let key = event.key;
    if (keys.includes(key)){
        let btn = document.querySelector(`.${key}`);
        btn.classList.toggle("pressed"); //remove pressed class
    }
}
