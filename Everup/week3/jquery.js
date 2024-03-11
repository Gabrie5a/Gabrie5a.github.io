alert('Jquery!');
document.querySelector('h1').textContent = 'Coffe';
document.querySelector('h1').style.color = 'red';

//similar to above
$('h1').css("color", "red");
$('h1').css("fontSize", "red");
//add class to the element
$('h1').addClass('colorClass');
//can add classes on jquery
$('h1').text('Pizza');
$('button').html("<b>checkAgain</b>")
//addEventLidtener
//maybe doesnt work
$('h1').click(function(){
    $('h1').text('Dinner Menu');
});
//diff method
$('h1').on('click', function(){
    $('h1').text("Menu");
});
$('h1').click(function(){
    $('h1').text("Menu");
    $('h1').fadeIn();//already there
    $('h1').fadeOut();
    $('h1').fadeToggle();
    $('h1').slideToggle();
});

//regular js worksd
document.querySelectorAll('button').addEventListener('click', );
$('button').on('click', function(){
    $('h1').fadeToggle();
    $('h2').slideToggle();
    $('h2').text('Something else');
});

for (let i = 0; i < 10; i++){
    document.querySelectorAll('button')[i].addEventListener('click', function(){
        document.querySelector('h2').textContent = "Something else";
    })
}

//open directopry u wanna initialize
//git init 
//giot status
//git add file1.txt
//git add .
//git commit -m 'add line'
//git log
//git branch nameofbranch
//git checkout nameOfranch
                    
