// Minimum
function min(a, b){
    if (a < b) return a;
    else return b;
}
console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

//Recursion
const isEven = n =>{
    if (n == 0) return true;
    else if (n == 1) return false;
    else {
        return isEven(Math.abs(n-2));
    }
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));

// Bean counting
const countBs = function (str){
    let count = 0;
    for (let chr of str){
        if (chr == 'B') count++;
    }
    return count;
}

// Char counting
const countChar = function (str, chr){
    let count = 0;
    for (let n of str){
        if (n == chr) count++;
    }
    return count;
}

console.log(countBs("BOB"));
// → 2
console.log(countChar("kakkerlak", "a"));
// → 4