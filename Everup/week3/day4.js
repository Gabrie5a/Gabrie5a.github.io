// 'use strict'
//alert, prompt, textSelector
//alert('Hellor');
//filter method to filter certain array values to another
const someArray =[, 'John', 2, 'Petter', true, false];

for(let i =0; i< someArray.length; i++){
    if (typeof someArray[i] == 'string') continue;//continue skips the if statement
    console.log(someArray[i], typeof someArray[i]);
    if (typeof someArray[i] == 'string') break;//terminate loop
}

//looping backwards

for(let i = someArray.length-1; i >= 0; i--){
    console.log(someArray[i], typeof someArray[i]);
    if (typeof someArray[i] != 'string') continue;
    console.log(someArray[i], typeof someArray[i]);
}

//Another loop 

let rep = 10;

while (rep < 13){
    console.log(`Still positive! current number: ${rep}`);
    rep++;
}

//generate random #
let dice = Math.random();//range btw 0 - 1
Math.trunc(Math.random()*6+1);//truncate
Math.floor(Math.random()*10+1);//number floor

console.log(dice);

// do{
//     let dice = Math.trunc(Math.random()*6+1);//truncate
// } while(rep > 6);

for(rep in someArray){//loops through the array
    console.log(`or in loop:`, someArray[rep]);
}


/*Another Game

2 players

dice value -> higher value -> first

race between dice rolling

update the total number

*/


//DOM
console.log(document.querySelector('h1'));

document.querySelector('.header').textContent;

document.querySelector('h1').style.backgroundColor = "red";//

document.querySelector('h1').style.width = '30%';

// change class name
// childnodes??.length gets the lit # of the element
const header = document.querySelectorAll('h1').className = "blockAll";//all gets all the ps
const header1 = document.querySelector('h1');
const input1 = document.querySelector('input');
document.querySelector('button').addEventListener('click', function (){
    if (input1.value === '8'){
        header1.textContent = '8';
    }
    alert(`${input1.value} Got your number`);
    document.querySelector('h1').style.color = "purple";
});
