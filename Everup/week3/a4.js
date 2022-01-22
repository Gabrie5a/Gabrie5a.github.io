// 'use strict'
//Part A - Temp Converter
let temp = -10;
function tempConvert(deg){
    let faren =0;
    faren = temp * (9/5) + 32;
    return faren;
}
console.log(`${temp} °C is ${tempConvert(temp)} °F`);
//faren to celsius 
let faren = 23;
function tempFaren(deg){
    let cel = 0;
    cel = (faren-32) * (5/9);
    return cel;
}
console.log(`${faren} °F is ${tempFaren(faren)} °C`);

//Part B - BMI Calculator

const bmi = document.querySelector('#bmi');
bmi.addEventListener("click", weight);
function weight(){
    let weightJ = prompt(`Please enter John's weight (in kg)`);
    let heightJ = prompt(`Please enter John's height (in m)`);
    let weightL = prompt(`Please enter John's weight (in kg)`);
    let heightL = prompt(`Please enter John's height (in m)`);
    let johnBMI = Number(weightJ)/(Number(heightJ)**2);
    let lucasBMI = Number(weightL)/(Number(heightL)**2);
    let lucasHigherBMI = true;
    if (johnBMI > lucasBMI){
        lucasHigherBMI = false;
    }
    console.log(`John's BMI (${johnBMI}) is higher than Lucas' BMI (${lucasBMI}), that is ${lucasHigherBMI}`);
    document.querySelector('h2').textContent = `John's BMI (${johnBMI}) is higher than Lucas' BMI (${lucasBMI}), that is ${lucasHigherBMI}!`;
}


//Part C - Number Game
const game = document.querySelector('#pointB');
game.addEventListener("click", update);
function update(){
    let input = prompt('Please Enter a Number!');
    if (Number(input) ===10 || Number(input) === 8){
        console.log(`You win ${input} points`);
        document.querySelector('#point').textContent = `You win ${input} points!`;
    }
    else if (input.length === 0 || isNaN(input)){
        document.querySelector('#point').textContent = "Please Enter A Number!!";
        console.log("Pkease Enter A Number!");
        // update();
    }
    else{
        console.log("NOT MATCHED!!");
        document.querySelector('#point').textContent = "NOT MATCHED!!";
    }
}
