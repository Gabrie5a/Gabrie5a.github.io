//switch staement 
'use strict'
const cup='Coffee';

switch (cup){
    case 'Mocha': 
        console.log(`Mocha is tasty`);
        console.log(`Mocha Time`);
    case 'Coffee':
        console.log(`I like Coffe`);
        //terminate after 
        break;
    case 'Pizza':
        console.log('Amazong!');
    default:
        console.log('No food!');

}

const calRetireYears = function (pName, birthYear){
    const pAge= calAge(birthYear); //call other function
    const pAge = 2022 - birthYear;
    const diffAge = 16 - pAge;
    if (diffAge > 0 && diffAge <3){
        const result = `You are not 16 yet, wait for another ${diffAge} + 24`;
        return result;
    }
    else if (diffAge > 3){
        console.log(`You are too young`);
        return -1;//terminates function
    }
    else{}
    return `${pName} is ${pAge} years old..`;
}

function show(){
    console.log (`Hello`);
}
//Arrays (Data Structure)
const score1 = 100;
const score2=82;
const score3 = 60;
//can store any data type
const scores = [100, 82, 80, 60, 100, 82, "john", 2+2, true, [2,43,45,6]];
console.log(scores);
console.log(scores[2]);
//don't need () cus there is already values in scores
scores.length;
console.log(scores[scores.length-1]);
//returns index of John
console.log(scores.indexOf('John'));
console.log(scores.indexOf('Petter')); //retyurn -1
//will return true/false
console.log(scores.includes('Peter'));

calRetireYears.length;

scores.push('Petter');//adds value to the end
scores.pop();
//adds to the front
scores.unshift('Hello');
//removes first value
scores.shift();

//another wway 
const year = new Array(1990, 1996, 1000, 2323, 'John');

//for loops
const birthYear = [1990, 1992, 1988, 1980];

const calAge = bithYear => 2022-bithYear;

const ageStu = [calAge(birthyear[0]), calAge(birthYEar[1])];

//tips calc
[30,100,50]//value of food

function getFinalBill(guestNUm){
    //prompt for each guest
    const bill = [];//empty array
    bill.push();
}
const john = [
    'john',
    'smith',
    'john@gmail.com',
    1996,
    2022-1996,
]
//defining an object
const johnObj = {
    firstName: 'John',
    lastname: 'smith',
    email: 'john@gmail.com',
    birthyear: 1996,
    age: 2022-1996,
    friends: ['Peter', 'jack', 'Harry'],
    calAge: function (){
        //same as johnObj.age
        this.age=2022-this.birthYear;
        return this.age;
    },
    showInfo: function(){
        return `${this.firstName} ${this.lastname} is 
        ${this.calAge()} years old as of 2022, and ${this.firstName}'s
        best friend is ${this.friends[1]}, he has ${? a :no} driver license`;
    }
}
console.log(johnObj);

johnObj.address = '101 NY, 1001'; //add attribute
johnObj['address'] = '104 NY 1001';

//cal funct
console.log(johnObj.calAge());

/*LOOPS*/
const ageforAll = [];
for (let i = 1; i <= 10; i++){
    console.log(`Order coffe ! ${i}`);
    ageforAll.push(calAge(birthyear[i]));
}

while(){

}

document.querySelector('button').addEventListener
//extra loop types
// for in, for of, do while


//
function checkWhoWin(){
    const result = AvgScore > 10 ? `You win` : ``;
}

