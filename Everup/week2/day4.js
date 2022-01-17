alert('Hello!');
console.log(2+2);
// quotations work like in python they dont matter
console.log("hello saturday", "heloo monday")
let cup='coffee';
if (cup==='coffee') alert('Hey!');
document.querySelector('div');

//h1 given to cup variable
cup=document.querySelector('h1');
cup.addEventListener("click", updateValue);
function updateValue(){ 
    //textContent is predefined
    let userInput=prompt('Type something here !');
    cup.textContent=userInput;
}

document.querySelector('h2').textContent ='Burger';