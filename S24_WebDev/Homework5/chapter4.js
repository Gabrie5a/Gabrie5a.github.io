// The sum of a range
function range(start, end, step=1){
    let rangeArr = [];
    for (start; start != end+step; start+=step){
        rangeArr.push(start);
    }
    return rangeArr;
}
function sum(array){
    let sum = 0;
    for(let n of array){
        sum+=n;
    }
    return sum;
}
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

// Reversing an array
const reverseArray = (array) => {
    let revArr = [];
    for (let el of array){
        revArr.unshift(el);
    }
    return revArr;
}
const reverseArrayInPlace = (array) => {
    let arrLength = array.length;
    for (let el = 1; el <= arrLength-1; el++){
        array.unshift(...array.splice(el,1));
    }
    return array;
}
let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"];
console.log(myArray);
// → ["A", "B", "C"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]


//List
function arrayToList(arr){
    let list = null;
    for(let n = arr.length-1; n >= 0; n--){
        list = prepend(arr[n], list);
    }
    return list;
}
function listToArray(list){
    let arr = [];
    let n = 0;
    while(nth(list,n) != null){
        arr.push(nth(list,n));
        n++;
    }
    return arr;
} 
function prepend(el, list){
    return {value: el, rest: list};
}
function nth(list, index){  //recursive
    if(index == 0) return list.value;
    else{
        if (list.rest == null) return null;
        else return nth(list.rest, index-1);
    }
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

//Deep comparison
const deepEqual = (el, el2) =>{
    if (typeof el == "object" && typeof el2 == "object"){
        for (let prop of Object.keys(el)){
            if (typeof el == "object" && el!= null && typeof el2 == "object" && el2 != null){
                for (let proper of Object.keys(el[prop])){
                    if (!(el[prop][proper] === el2[prop][proper])) return false;
                }
            }
            else if(!(el[prop] === el2[prop])) return false;
        }
        return true;
    }
    else if(el === el2) return true;
    else return false;
}
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true