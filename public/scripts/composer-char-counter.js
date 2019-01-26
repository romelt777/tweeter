
$(document).ready(function() {

});


//setting variable for character counter,
var char = 140;
var count = document.getElementsByClassName("counter");
count[0].innerHTML = char;


//get elements by name returns an array so we must reference to use.

var listen1 = document.getElementsByName("text");
listen1[0].addEventListener("keypress", testFunction); //listens to text box, if key is pressed then function is called.

function testFunction() {
  char = 139 - this.value.length;
  if (char < 0){
    count[0].innerHTML = char;
    document.getElementsByClassName("counter")[0].style.color = "red";
    return char;
  } else {
    count[0].innerHTML = char;
    document.getElementsByClassName("counter")[0].style.color = "black";
    return char;
  }
}