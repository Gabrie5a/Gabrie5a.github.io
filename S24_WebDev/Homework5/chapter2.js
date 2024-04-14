//Looping a triangle
function looping_a_triangle(){
    let hashtag = "#";
    for (let counter = 0; counter < 7; counter++){
    console.log(hashtag);
    hashtag += "#";
    }
}
console.log("Looping a Triangle:");
looping_a_triangle();

//FizzBuzz
function fizz_buzz(){
    for (let counter = 1; counter < 101; counter++){
        if(counter%3 == 0 && counter%5 ==0)
          console.log("FizzBuzz");
        else if (counter%3 == 0)
          console.log("Fizz");
        else if (counter%5 == 0)
          console.log("Buzz");
        else
            console.log(counter);
    }
}
console.log("\nFizz Buzz:");
fizz_buzz();

//Chessboard
function chessboard(gridSize=8){
    let chessBoard = "";
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j <gridSize; j++){
            if (i%2 == 0 && j%2 == 0){
                chessBoard = chessBoard + " ";
            }
            else if (i%2 != 0 && j%2 != 0)
                chessBoard = chessBoard + " ";
            else
                chessBoard = chessBoard + "#";                
        }  
        chessBoard = chessBoard + "\n";  
    }
    console.log(chessBoard);
};
console.log("\nChessboard:")
chessboard();

function grid(gridW, gridH){
    let chessBoard = "";
    for (let i = 0; i < gridH; i++){
        for (let j = 0; j <gridW; j++){
            if (i%2 == 0 && j%2 == 0){
                chessBoard = chessBoard + " ";
            }
            else if (i%2 != 0 && j%2 != 0)
                chessBoard = chessBoard + " ";
            else
                chessBoard = chessBoard + "#";                
        }  
        chessBoard = chessBoard + "\n";  
    }
    console.log(chessBoard);
};
console.log("\nGrid:")
grid(5, 10);

