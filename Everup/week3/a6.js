const netS1 = [80, 82, 100];
const knickS1 = [80, 90, 106];
const netS2 = [98, 110, 101];
const knickS2 = [108, 92, 110];


function winner(team1, team2){
    let netTotal = 0;
    let knickTotal = 0;
    for (let i = 0; i < 3; i++){//alt: team1.length
        netTotal += team1[i];
        knickTotal += team2[i];
    }
    let netAvg = netTotal/3;
    let knickAvg = knickTotal/3;
    if (netAvg > knickAvg && netAvg >= 100){
        console.log('Net has won');
    }
    else if (knickAvg > netAvg && knickAvg >= 100){
        console.log('Knick has won');
    }
    else if (knickAvg === netAvg && (netAvg*2) >= 100){
        console.log(`It's a draw!`);//
    }
    else{
        console.log('Neither team reached an average of 100 points')
    }
}

function callScoresNet(){
    for (let i = 0; i < 3; i++)
        netS1[i] = Number(prompt(`Input Score of Round ${i+1}`));
}

function callScoresKnick(){
    for (let i = 0; i < 3; i++)
        knickS1[i] = Number(prompt(`Input Score of Round ${i+1}`));   
}

function winnerWho(){
    console.log(netS1,knickS1);
    winner(netS1, knickS1);
}


//tip Calculator
function calculateBill(){
    let bill = prompt('Calculate Bill');
    let tip = 0;
    let total = 0;
    switch(bill){
        case((bill > 30) && (bill < 100)):
            tip = bill * 0.15;
            total = Number(tip) + Number(bill);
            console.log(`The bill was ${bill}, 
            the tip was ${tip}, and the total value ${total}`);
            break;
        default:
            tip = bill * 0.15;
            total = Number(tip) + Number(bill);
            console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${total}`);
    };
};



//Temperature converter

let convertCelciusToFaren = (celsius) => {
    let faren = celsius * (9/5) + 32;
    console.log(`${celsius} °C is ${faren} °F`);
};

let convertFarenToCelsius = (faren) => {
    let celsius = (faren-32) * (5/9);
    console.log(`${faren} °F is ${celsius} °C`);
};

function callCelsius(){
    convertCelciusToFaren(prompt("Enter Temperature in Degree Celsius"));
}

function callFaren(){
    convertFarenToCelsius(prompt("Enter Temperature in Degree Farenheit"));
}